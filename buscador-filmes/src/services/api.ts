import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API;

if (!API_KEY || !BASE_URL) {
  console.error(
    "As variáveis de ambiente VITE_API_KEY e VITE_BASE_API precisam estar configuradas"
  );
}

export const searchMovies = async (query: string) => {
  try {
    if (!query.trim()) {
      return [];
    }

    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}`
    );

    if (response.data.Response === "False") {
      console.error("Erro na busca:", response.data.Error);
      return [];
    }

    return response.data.Search || [];
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);

    if (response.data.Response === "False") {
      console.error("Erro ao buscar detalhes do filme:", response.data.Error);
      throw new Error(response.data.Error);
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
};
