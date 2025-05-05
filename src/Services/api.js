const API_KEY = "8f71a957707aaf383504d818dc94f218";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
};

export const getSearchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
  );
  const data = await response.json();
  return data.results;
};

export const getTopRatedMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await response.json();
  return data.results;
};

export const getHorrorMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US&page=1`
  ); // 27 is Horror genre ID
  const data = await response.json();
  return data.results;
};

export const getSciFiMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878&language=en-US&page=1`
  ); // 878 is Sci-Fi genre ID
  const data = await response.json();
  return data.results;
};

export const getComedyMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US&page=1`
  ); // 35 is Comedy genre ID
  const data = await response.json();
  return data.results;
};

export const getActionMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&page=1`
  ); // 28 is Action genre ID
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
  );
  const data = await response.json();
  return data;
};