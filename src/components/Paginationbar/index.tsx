import React from "react";
import { Pagination } from "@mui/material";
import styles from "./style.module.scss";

interface Paginationbar {
  setPage: (value: number) => void;
  page: number;
  count: number;
}

export const Paginationbar: React.FC<Paginationbar> = ({
  setPage,
  page,
  count,
}) => {
  return (
    <Pagination
      className={styles.paginationContainer}
      count={Math.floor(count/10)}
      shape="rounded"
      page={page}
      onChange={(_, value) => setPage(value)}
      color="primary"
    />
  );
};
