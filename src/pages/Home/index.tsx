import React, { useCallback, useEffect } from "react";
import { Searchbar } from "../../components/Searchbar";
import { MoviesList } from "../../components/MoviesList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMovies } from "../../store/reducers/moviesReducer";
import { Paginationbar } from "../../components/Paginationbar";
import styles from "./style.module.scss";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((s) => s.movies.count);
  const [searchKey, setSearchKey] = useQueryState(
    "search",
    parseAsString.withDefault("friends")
  );
  const [type, setType] = useQueryState(
    "type",
    parseAsStringEnum(["all", "movie", "series", "episode"]).withDefault("all")
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    dispatch(fetchMovies({ s: searchKey, type, page }));
  }, [searchKey, type, page]);

  const handleOnSearch = useCallback((value: string) => {
    setSearchKey(value);
    setPage(1);
  }, []);

  const handleOnSelectType = (value: string) => {
    setType(value as any);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>Movies Center</h1>
      <Searchbar
        setSearchKey={handleOnSearch}
        setType={handleOnSelectType}
        type={type}
        searchKey={searchKey}
      />
      <MoviesList />
      <Paginationbar page={page} setPage={setPage} count={count} />
    </div>
  );
};
