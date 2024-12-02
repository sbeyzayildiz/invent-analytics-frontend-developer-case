import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMovieDetailByImdbID } from "../../store/reducers/moviesReducer";
import styles from "./style.module.scss";
import {
  Chip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Star, ArrowBack } from "@mui/icons-material";

export const Movie = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, movieByImdbID } = useAppSelector((s) => s.movies);
  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchMovieDetailByImdbID(id));
  }, [id]);

  return (
    <>
      {loading && <div className={styles.loader}><CircularProgress size="3rem" /></div>}
      {movieByImdbID && (
        <div className={styles.container}>
          <IconButton
            sx={{ marginRight: "24px" }}
            color="primary"
            onClick={() => navigate(-1)}
          >
            <ArrowBack sx={{ color: "#fff" }} />
          </IconButton>
          <div className={styles.image}>
            <img src={movieByImdbID.Poster} alt={movieByImdbID.Title} />
          </div>
          <div className={styles.text}>
            <h1>{movieByImdbID.Title}</h1>
            <div>
              {movieByImdbID.Year} &bull;
              {movieByImdbID.Runtime} &bull;
              <Star sx={{ color: "#f5c519", marginRight: "4px" }} />
              {movieByImdbID.imdbRating}/10 &bull;
              {movieByImdbID.Genre &&
                movieByImdbID.Genre.split(",").map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre}
                    variant="outlined"
                    sx={{ color: "#fff", margin: "0 4px" }}
                  />
                ))}
            </div>
            <p>{movieByImdbID.Plot}</p>
            <p>
              <b>Director: </b> {movieByImdbID.Director}
            </p>
            <hr />
            <p>
              <b>Writer: </b> {movieByImdbID.Writer}
            </p>
            <hr />
            <p>
              <b>Actors: </b> {movieByImdbID.Actors}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
