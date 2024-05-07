const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjA3NDg5ZmU4YWZjMzYzY2Y2ZjkzYzFiMDQ3OGEyNSIsInN1YiI6IjY2MWJkZjMxMGZiMzk4MDE2MjhhMjA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESV1cudN1GmGzbljvvlSCaFUSAcgxGmeJh00PZ7t64c";
const MOVIES_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const SEARCH_MOVIES_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&page=1";

let page = 1;
let moviesList = [];
let favouriteMovies = JSON.parse(localStorage.getItem("favourites")) || []; // getting the data from local storage if any
const searchEl = document.querySelectorAll(".search-input");
const formEl = document.querySelectorAll(".form");
const favouriteMoviesNavEl = document.querySelector(".favourite");
const homeNavEl = document.querySelector(".home");
const moviesSectionEl = document.querySelector(".movies-section");
const moviesContainerEl = document.querySelector(".movies-section .row");
const homeSectionEl = document.querySelector(".home-section");
const movieDetailsEl = document.querySelector(".movie-details-container");
const favouriteMoviesSectionEl = document.querySelector(
  ".favourite-movies-container"
);
const favouriteMoviesContainerEl = document.querySelector(
  ".favourite-movies-container .row"
);
const submitBtn = document.querySelectorAll(".submit-btn");
const navSubmitBtn = document.querySelector("#nav-search-submit-btn");
const mainSubmitBtn = document.querySelector("#main-search-submit-btn");
const navInputEl = document.querySelector("#nav-input");
const mainInputEl = document.querySelector("#main-input");

/**
 * to add the movies to favourites
 * @param {id of the movie selected} movieId
 */
function addToFavourite(movieId) {
  const movieData = moviesList.find((movie) => movie.id === movieId);
  const movieExists =
    favouriteMovies &&
    favouriteMovies.find((movie) => movie.id === movieData.id);
  if (!movieExists) {
    favouriteMovies.push(movieData);
    localStorage.setItem("favourites", JSON.stringify(favouriteMovies));
  }
}

/**
 * to remove the movie from the favourites list
 * @param {id of the movie} movieId
 */
function removeFromFavourites(movieId) {
  favouriteMovies = favouriteMovies.filter((movie) => movie.id !== movieId);
  localStorage.setItem("favourites", JSON.stringify(favouriteMovies));
  renderFavouriteMovies();
}

/**
 * to render the favourite movies
 */
function renderFavouriteMovies() {
  favouriteMovies = JSON.parse(localStorage.getItem("favourites"));
  favouriteMoviesContainerEl.innerHTML = "";
  favouriteMovies &&
    favouriteMovies.forEach((movie) => {
      const columnEl = document.createElement("div");
      columnEl.className = "col";
      columnEl.innerHTML = `
      <div class="card text-bg-dark">
      <img src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" class="card-img" alt="${movie.title}" />
      <div
      class="d-flex flex-column justify-content-end align-item-center text-center card-img-overlay movie-card-overlay"
      >
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text text-truncate text-wrap">${movie.overview}</p>
      <p class="card-text"><small>${new Date(
        movie.release_date
      ).getFullYear()}</small></p>
      <div class="d-flex justify-content-end">
      <button
      class="btn btn-light d-flex justify-content-center align-items-center rounded-pill w-25 dislike-btn"
      >
      <i class="fa-solid fa-heart-crack"></i>
      </button>
      </div>
      </div>
      </div>
      `;

      // event listener for the movie card to show the details
      columnEl.addEventListener("click", () => {
        // setting the selected movie details to the local storage
        localStorage.setItem("movie", JSON.stringify(movie));
        // to open the movieDetails page in the new tab
        window.open("movieDetails.html?_blank");
      });

      const dislikeBtn = columnEl.querySelector("button");
      dislikeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        dislikeBtn.innerHTML = '<i class="fa-solid fa-heart-crack"></i>';
        dislikeBtn.classList.add("text-dark");
        removeFromFavourites(movie.id);
      });

      // appending the element
      favouriteMoviesContainerEl.appendChild(columnEl);
    });
}

/**
 * to render movies on the initial load and on search
 */
function renderMovies() {
  moviesContainerEl.innerHTML = "";
  moviesList &&
    moviesList.forEach((movie) => {
      const columnEl = document.createElement("div");
      columnEl.className = "col";
      columnEl.innerHTML = `
      <div class="card text-bg-dark">
      <img src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" class="card-img" alt="${movie.title}" />
      <div
      class="d-flex flex-column justify-content-end align-item-center text-center card-img-overlay movie-card-overlay"
      >
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text text-truncate text-wrap">${movie.overview}</p>
      <p class="card-text"><small>${new Date(
        movie.release_date
      ).getFullYear()}</small></p>
      <div class="d-flex justify-content-end">
      <button
      class="btn btn-light d-flex justify-content-center align-items-center rounded-pill w-25 like-btn"
      >
      ${
        favouriteMovies.find((item) => item.id === movie.id)
          ? '<i class="fa-solid fa-heart text-danger"></i>'
          : '<i class="fa-regular fa-heart"></i>'
      }
      </button>
      </div>
      </div>
      </div>
      `;

      // event listener for the movie card to show the details
      columnEl.addEventListener("click", () => {
        // setting the selected movie details to the local storage
        localStorage.setItem("movie", JSON.stringify(movie));
        // to open the movieDetails page in the new tab
        window.open("movieDetails.html?_blank");
      });

      const likeBtn = columnEl.querySelector("button");
      likeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        likeBtn.classList.add("text-danger");
        addToFavourite(movie.id);
      });

      // appending the element
      moviesContainerEl.appendChild(columnEl);
    });
}

/**
 * to search the movies
 * @param {input value from the user} searchTerm
 */
async function searchMovies(searchTerm = "") {
  try {
    const response = await fetch(`${SEARCH_MOVIES_URL}&query=${searchTerm}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    moviesList = data.results;
    renderMovies();
  } catch (error) {
    console.log(error);
  }
}

/**
 * to get the data of movies on the initial page load
 */
async function getMovies() {
  try {
    const response = await fetch(MOVIES_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    moviesList = data.results;
    renderMovies();
  } catch (error) {
    console.log(error);
  }
}

/**
 * event listener to the search input
 */
searchEl.forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value != "" ? searchMovies(event.target.value) : getMovies();
  });
});

/**
 * event listener to the submit button with in the navbar search
 */
navSubmitBtn.addEventListener("click", (event) => {
  const inputValue = document.querySelector("#nav-input").value;
  inputValue != "" ? searchMovies(inputValue) : getMovies();
});

/**
 * event listener to the submit button with in the main search
 */
mainSubmitBtn.addEventListener("click", (event) => {
  const inputValue = document.querySelector("#main-input").value;
  inputValue != "" ? searchMovies(inputValue) : getMovies();
});

/**
 * event listener to the form element to prevent unwanted submission
 */
formEl.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

/**
 * event listener to home button
 */
homeNavEl.addEventListener("click", () => {
  homeNavEl.classList.add("active");
  favouriteMoviesNavEl.classList.remove("active");
  homeSectionEl.classList.remove("hide");
  favouriteMoviesSectionEl.classList.add("hide");
  renderMovies();
});

/**
 * event listener to favourites button
 */
favouriteMoviesNavEl.addEventListener("click", () => {
  favouriteMoviesNavEl.classList.add("active");
  homeNavEl.classList.remove("active");
  homeSectionEl.classList.add("hide");
  favouriteMoviesSectionEl.classList.remove("hide");
  renderFavouriteMovies();
});

// initial load
getMovies();
