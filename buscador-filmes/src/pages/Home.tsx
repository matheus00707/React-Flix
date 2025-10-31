import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/api";
import { type Movie } from "../types";
import "./Home.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  const toggleFavorite = (e: React.MouseEvent, imdbID: string) => {
    e.stopPropagation(); // Impede a navegação ao clicar na estrela
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(imdbID)) {
        return prevFavorites.filter((id) => id !== imdbID);
      } else {
        return [...prevFavorites, imdbID];
      }
    });
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      backgroundColor: "#0d0d0d",
      color: "#39FF14",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "'Courier New', Courier, monospace",
    },
    title: {
      textAlign: "center",
      fontSize: "2.5rem",
      textShadow: "0 0 10px #39FF14, 0 0 20px #39FF14",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      border: "2px solid #39FF14",
      backgroundColor: "#1a1a1a",
      color: "#39FF14",
      borderRadius: "5px 0 0 5px",
      outline: "none",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      border: "2px solid #39FF14",
      backgroundColor: "#39FF14",
      color: "#0d0d0d",
      cursor: "pointer",
      borderRadius: "0 5px 5px 0",
      fontWeight: "bold",
    },
    movieGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "30px",
      padding: "0 20px",
      width: "100%",
      maxWidth: "100%",
    },
    movieCard: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #39FF14",
      borderRadius: "8px",
      padding: "15px",
      textAlign: "center",
      cursor: "pointer",
      position: "relative",
      transition: "transform 0.2s, box-shadow 0.2s",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    favoriteStar: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "1.5rem",
      zIndex: 2,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Buscador de Filmes</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do filme..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Buscar
        </button>
      </form>

      <div style={styles.movieGrid}>
        {movies?.map((movie) => {
          const isFavorited = favorites.includes(movie.imdbID);
          return (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              className="movie-card"
            >
              <span
                style={{
                  ...styles.favoriteStar,
                  color: isFavorited ? "#FFD700" : "#555",
                }}
                onClick={(e) => toggleFavorite(e, movie.imdbID)}
              >
                &#9733;
              </span>
              <h3 className="movie-title">{movie.Title}</h3>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
