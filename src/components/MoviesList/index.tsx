import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../NotFound";
interface MoviesList {}

export const MoviesList: React.FC<MoviesList> = ({}) => {
  const { loading, error, movies } = useAppSelector((s) => s.movies);
  const navigate = useNavigate();

  const handleClickTitle = (id: string) => {
    navigate(`/movies/${id}`);
  };
  return (
    <>
      {loading && <CircularProgress size="3rem" />}
      {error && <NotFound />}
      {
        <div className={styles.container}>
          {!loading && !error && (
            <div className={styles.movieList}>
              {movies.map((movie) => (
                <Card
                  key={movie.imdbID}
                  sx={{ maxWidth: 200, bgcolor: "#121212", color: "#fff" }}
                >
                  <CardMedia
                    component={"img"}
                    image={
                      movie.Poster === "N/A"
                        ? "src/images/no-image-icon.png"
                        : movie.Poster
                    }
                  />
                  <CardContent>
                    <Typography
                      className={styles.movieTitle}
                      onClick={() => handleClickTitle(movie.imdbID)}
                    >
                      {movie.Title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "darkgray" }}>
                      {movie.Year}
                    </Typography>
                    {/* <Typography>{movie.imdbID}</Typography> */}
                    <Typography sx={{ color: "darkgray" }}>
                      {movie.Type}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      }
    </>
  );
};
