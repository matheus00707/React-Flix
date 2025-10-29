import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API;


export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  return response.data.Search || [];
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return response.data;
};