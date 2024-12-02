import React, { useEffect, useState } from "react";
import { Searchbar } from "../../components/Searchbar";
import { MoviesList } from "../../components/MoviesList";
import { useAppDispatch } from "../../store/hooks";
import { fetchMovies } from "../../store/reducers/moviesReducer";
import { Paginationbar } from "../../components/Paginationbar";
import styles from "./style.module.scss";

export const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchKey, setSearchKey] = useState('friends');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchMovies({ s: searchKey, type, page }))
    }, [searchKey, type, page])

    const handleOnSearch = (value: string) => {
        setSearchKey(value);
        setPage(1)
    }

    const handleOnSelectType = (value: string) => {
        setType(value)
        setPage(1)
    }

    const handleChangePage = (value: number) => {
        setPage(value)
    }


    return (
        <div className={styles.container}>
            <h1>Movies Center</h1>
            <Searchbar onSearch={handleOnSearch} onSelectedType={handleOnSelectType} />
            <MoviesList onChangePage={handleChangePage} />
            <Paginationbar onChangePage={handleChangePage} />
        </div>

    )
}