import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovieDetailByImdbID } from '../../store/reducers/moviesReducer';
import styles from './style.module.scss';
import { Card, CardMedia, Chip, CircularProgress, IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Star , ArrowBack} from '@mui/icons-material';

export const Movie = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, movieByImdbID } = useAppSelector(s => s.movies)
    useEffect(() => {
        console.log('hellooo');

        if (!id) {
            return;
        }
        dispatch(fetchMovieDetailByImdbID(id))
    }, [id])


    return (
        <>
            {loading &&  <CircularProgress size="3rem" />}
            {movieByImdbID && <div className={styles.container}>
                <IconButton sx={{marginRight: '24px'}} color='primary' onClick={() => navigate(-1)}>
                    <ArrowBack sx={{color: '#fff'}} />
                </IconButton>
                <div className={styles.image}>
                    <img src={movieByImdbID.Poster} alt={movieByImdbID.Title} />
                </div>
                <div className={styles.text}>
                    <h1>{movieByImdbID.Title}</h1>
                    <p>{movieByImdbID.Year} &bull;
                        {movieByImdbID.Runtime} &bull;
                        <Star sx={{ color: '#f5c519', marginRight: '4px' }} />{movieByImdbID.imdbRating}/10  &bull;
                        {movieByImdbID.Genre.split(',').map((genre) => <Chip label={genre} variant="outlined" sx={{ color: '#fff', margin: '0 4px' }} />)}
                    </p>
                    <p>{movieByImdbID.Plot}</p>
                    <p><b>Director: </b> {movieByImdbID.Director}</p>
                    <hr />
                    <p><b>Writer: </b> {movieByImdbID.Writer}</p>
                    <hr />
                    <p><b>Actors: </b> {movieByImdbID.Actors}</p>
                </div>
            </div>
            }
        </>
    )
}
