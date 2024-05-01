const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjA3NDg5ZmU4YWZjMzYzY2Y2ZjkzYzFiMDQ3OGEyNSIsInN1YiI6IjY2MWJkZjMxMGZiMzk4MDE2MjhhMjA1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESV1cudN1GmGzbljvvlSCaFUSAcgxGmeJh00PZ7t64c";
const ALL_URL = "https://api.themoviedb.org/3/trending/all/day?language=en-US";
const MOVIES_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

let page = 1;

const searchEl = document.querySelectorAll(".search-input");

async function getData(searchTerm) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log({ data });
  const filteredData = data.results.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchTerm)
  );
  console.log({ filteredData });
}

searchEl.forEach((input) => {
  input.addEventListener("input", (event) => {
    event.target.value != "" && getData(event.target.value.toLowerCase());
  });
});
