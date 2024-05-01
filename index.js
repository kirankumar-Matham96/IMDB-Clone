const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjA3NDg5ZmU4YWZjMzYzY2Y2ZjkzYzFiMDQ3OGEyNSIsInN1YiI6IjY2MWJkZjMxMGZiMzk4MDE2MjhhMjA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESV1cudN1GmGzbljvvlSCaFUSAcgxGmeJh00PZ7t64c";
const ALL_URL = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
const MOVIES_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const SEARCH_MOVIES_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
let page = 1;

const searchEl = document.querySelectorAll(".search-input");
const moviesContainerEl = document.querySelector(".row");

function renderMovies(movies) {
  moviesContainerEl.innerHTML = "";
  movies.forEach((movie) => {
    const columnEl = document.createElement("div");
    columnEl.className = "col";
    columnEl.innerHTML = `
    <div class="card text-bg-dark">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img" alt="${movie.title}" />
      <div
        class="d-flex flex-column justify-content-end lign-item-center text-center card-img-overlay movie-card-overlay"
      >
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text text-truncate text-wrap">${movie.overview}</p>
        <p class="card-text"><small>${movie.release_date}</small></p>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-light d-flex justify-content-center align-items-center rounded-pill w-25 like-btn"
          >
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </div>`;
    moviesContainerEl.appendChild(columnEl);
  });

  // <!-- <i class="fa-solid fa-heart"></i> -->
}

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
    console.log({ data });
    renderMovies(data.results);
  } catch (error) {
    console.log(error);
  }
}

// get all the movies initially
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
    renderMovies(data.results);
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
