const API_KEY = "de41d090fdb73f875c22ca19b347cdea";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Fetch movies
export async function fetchPopularMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = await res.json();
  return data.results || [];
}

// SAFE image handler
export function getImageUrl(path) {
  if (!path) return "/movie.jpg";
  return `${IMAGE_BASE_URL}${path}`;
}