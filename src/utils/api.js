import { toast } from 'react-toastify';

const api = (()=> {
  const BASE_URL = 'https://api.themoviedb.org/3';

  //   apikey and token
  // const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

  //   status response check


  const checkStatus = async (response) => {
    const responseJson = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseJson.status_message || `HTTP error! status: ${response.status}`;

      switch (response.status) {
      case 401:
        toast.error('🔴 Unauthorized: API key mungkin salah atau tidak ada izin.');
        break;
      case 403:
        toast.error('🔴 Forbidden: Akses ke resource ini tidak diperbolehkan.');
        break;
      case 404:
        toast.error('🔴 Not Found: Data yang dicari tidak ditemukan.');
        break;
      case 422:
        toast.error('🔴 Unprocessable Entity: Parameter request salah.');
        break;
      case 429:
        toast.error('🔴 Too Many Requests: API rate limit terlampaui.');
        break;
      case 500:
        toast.error('🔴 Internal Server Error: Coba lagi nanti.');
        break;
      default:
        toast.error(`🔴 Error ${response.status}: ${errorMessage}`);
      }

      throw new Error(errorMessage);
    }

    return responseJson;
  };

  // token
  const _fetchWithToken = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization : `Bearer ${API_TOKEN}`,
        'Content-Type' : 'application/json',
      }
    });
  };

  const getPopularMovie = async () => {
    const response = await _fetchWithToken(
      `${BASE_URL}/movie/popular?language=en-US&page=1`
    );
    return checkStatus(response);
  };

  // upcoming
  const getUpComingMovies = async () => {
    const response = await _fetchWithToken(
      `${BASE_URL}/movie/upcoming?language=en-US&page=1`
    );
    return checkStatus(response);
  };

  //nowPlaying
  const getNowPlayingMovies = async () => {
    const response = await _fetchWithToken(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1`
    );
    return checkStatus(response);
  };

  // topRated
  const getTopRatedMovies = async () => {
    const response = await _fetchWithToken(
      `${BASE_URL}/movie/top_rated?language=en-US&page=1`
    );
    return checkStatus(response);
  };



  // trending this weeks
  const getTrendingMovieWeeks = async () => {
    const response = await _fetchWithToken(
      `${BASE_URL}/trending/movie/week?language=en-US&page=1`
    );
    return checkStatus(response);
  };

  // trending day

  const getTrendingMovieDay = async () => {
    const response = await _fetchWithToken(
      `${BASE_URL}/trending/movie/day?language=en-US&page=1`
    );
    return checkStatus(response);
  };


  // search
  const searchMovies = async (query) => {
    const response = await _fetchWithToken(
      `${BASE_URL}/search/movie?query=${query}&language=en-US&page=1`
    );
    return checkStatus(response);
  };




  return {
    getPopularMovie,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpComingMovies,
    getTrendingMovieDay,
    getTrendingMovieWeeks,
    searchMovies,
  };



  // end

})();

export default api;