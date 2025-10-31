import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { type MovieDetails as MovieDetailsType } from "../types";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const data = await getMovieDetails(id);
        if (data.Response === "False") setError(data.Error);
        else setMovie(data);
      }
    };
    fetchMovie();
  }, [id]);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      backgroundColor: "#0d0d0d",
      color: "#39FF14",
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "'Courier New', Courier, monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    loading: {
      fontSize: "2rem",
    },
    title: {
      fontSize: "3rem",
      textShadow: "0 0 10px #39FF14, 0 0 20px #39FF14",
      marginBottom: "20px",
    },
    poster: {
      border: "3px solid #39FF14",
      borderRadius: "10px",
      boxShadow: "0 0 20px #39FF14",
      maxWidth: "300px",
    },
    details: {
      marginTop: "20px",
      maxWidth: "600px",
      textAlign: "left",
      lineHeight: "1.6",
    },
    error: {
      fontSize: "1.5rem",
    },
  };

  if (!movie)
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Carregando...</div>
      </div>
    );

  if (error)
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
      </div>
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} style={styles.poster} />
      <div style={styles.details}>
        <p>
          <strong>Ano:</strong> {movie.Year}
        </p>
        <p>
          <strong>Diretor:</strong> {movie.Director}
        </p>
        <p>
          <strong>Enredo:</strong> {movie.Plot}
        </p>
      </div>
    </div>
  );
}
