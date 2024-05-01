const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjA3NDg5ZmU4YWZjMzYzY2Y2ZjkzYzFiMDQ3OGEyNSIsInN1YiI6IjY2MWJkZjMxMGZiMzk4MDE2MjhhMjA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESV1cudN1GmGzbljvvlSCaFUSAcgxGmeJh00PZ7t64c";
const MOVIES_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const SEARCH_MOVIES_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
let page = 1;

let moviesList = [];
const favouriteMovies = [];
const searchEl = document.querySelectorAll(".search-input");
const favouriteMoviesNavEl = document.querySelector(".favourite");
const moviesContainerEl = document.querySelector(".movies-section .row");
const homeSectionEl = document.querySelector(".home-section");
const movieDetailsEl = document.querySelector(".movie-details-container");
const favouriteMoviesContainerEl = document.querySelector(
  ".favourite-movies-container .row"
);

function renderFavouriteMovies() {
  console.log({ favouriteMovies });
  console.log(favouriteMoviesContainerEl);
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
      class="btn btn-light d-flex justify-content-center align-items-center rounded-pill w-25 like-btn"
      >
      <i class="fa-regular fa-heart"></i>
      </button>
      </div>
      </div>
      </div>
      `;

      // event listener for the movie card to show the details
      columnEl.addEventListener("click", () => {
        showMovieDetails(movie.id);
      });

      // console.log(columnEl.querySelector("button"));
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

favouriteMoviesNavEl.addEventListener("click", () => {
  homeSectionEl.classList.add("hide");
  movieDetailsEl.classList.add("hide");
  favouriteMoviesContainerEl.classList.remove("hide");
  renderFavouriteMovies();
});

/**
 * to add the movies to favourites
 * @param {id of the movie selected} movieId
 */
// add the movies to favourites
function addToFavourite(movieId) {
  const movie = moviesList.find((movie) => movie.id === movieId);
  favouriteMovies.push(movie);
  localStorage.setItem("favourites", JSON.stringify(favouriteMovies));
}

/**
 * to toggle the sections and render the selected movie details
 * @param {id of the movie selected} movieId
 */
function showMovieDetails(movieId) {
  homeSectionEl.classList.add("hide");
  movieDetailsEl.classList.remove("hide");
  renderSelectedMovieDetails(movieId);
}

/**
 * to render individual movie details
 * @param {id of the movie selected} movieId
 */
function renderSelectedMovieDetails(movieId) {
  debugger;
  const movie = moviesList.find((movie) => movie.id === movieId);
  console.log({ movie });
  const movieDetailsContainerEl = document.querySelector(
    ".movie-details-container"
  );

  movieDetailsContainerEl.innerHTML = `
  <button class="btn btn-dark rounded-pill mb-4 d-flex justify-content-center align-items-center back-btn">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <div  class="d-flex justify-content-center">
    <div class="d-flex justify-content-center poster-container">
      <img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      alt="${movie.title}"
      class="movie-poster"
      />
    </div>
    <div class="text-light w-50 movie-details">
      <h2 class="movie-title">${movie.title}</h2>
      <p class="movie-release-date">${new Date(
        movie.release_date
      ).getFullYear()}</p>
      <div class="rating">Rating: ${parseFloat(movie.vote_average).toFixed(
        1
      )} / 10</div>
      <button class="btn btn-dark rounded-fill add-to-favourites-btn">❤</button>
      <p class="mt-4 movie-overview">${movie.overview}</p>
    </div>
  </div>`;
  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
    movieDetailsEl.classList.add("hide");
    homeSectionEl.classList.remove("hide");
  });

  const addToFavouriteBtn = document.querySelector(".add-to-favourites-btn");
  addToFavouriteBtn.addEventListener("click", () => {
    addToFavouriteBtn.classList.add("text-danger");
    addToFavourite(movie.id);
  });
}

// render the movie cards
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
      <i class="fa-regular fa-heart"></i>
      </button>
      </div>
      </div>
      </div>
      `;

      // event listener for the movie card to show the details
      columnEl.addEventListener("click", () => {
        showMovieDetails(movie.id);
      });

      // console.log(columnEl.querySelector("button"));
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

// search for the movies
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

// get the trending movies initially
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

searchEl.forEach((input) => {
  input.addEventListener("input", (event) => {
    // const url = `${SEARCH_MOVIES_URL}&${event.target.value.toLowerCase().trim()}`;
    event.target.value != "" ? searchMovies(event.target.value) : getMovies();
  });
});

getMovies();
