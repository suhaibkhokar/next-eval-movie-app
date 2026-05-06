// Fetch documentaries (using genre 99 for documentaries)
export async function fetchDocumentaries(page = 1) {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch documentaries");
  const data = await res.json();
  return data.results || [];
}

// Fetch TV shows
export async function fetchTVShows(page = 1) {
  const res = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch TV shows");
  const data = await res.json();
  return data.results || [];
}
const API_KEY = "de41d090fdb73f875c22ca19b347cdea";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Fetch movies (with pagination)
export async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
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