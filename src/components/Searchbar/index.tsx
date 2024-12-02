import { Box, FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

interface Searchbar {
  setSearchKey: (value: string) => void;
  setType: (value: string) => void;
  type: string;
  searchKey: string;
}

export const Searchbar: React.FC<Searchbar> = ({
  setSearchKey,
  setType,
  searchKey,
  type,
}) => {
  const [tmpSearchValue, setTmpSearchValue] = useState(searchKey);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearchKey(tmpSearchValue);
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [tmpSearchValue]);

  return (
    <Box className={styles.container}>
      <TextField
        className={styles.searchbar}
        value={tmpSearchValue}
        onChange={(e) => setTmpSearchValue(e.target.value)}
        placeholder="Search..."
      />
      <FormControl>
        <Select
          className={styles.typeSelect}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="movie">Movie</MenuItem>
          <MenuItem value="series">TV Series</MenuItem>
          <MenuItem value="episode">TV Series Episode</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
