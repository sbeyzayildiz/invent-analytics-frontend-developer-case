import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './style.module.scss';

interface Types {
    title: string,
    value: string
}

interface Searchbar {
    onSearch: (value: string) => void;
    onSelectedType: (value: string) => void;
}

export const Searchbar: React.FC<Searchbar> = ({ onSearch, onSelectedType }) => {
    const movieTypeList: Types[] = [
        { title: 'All', value: 'all' },
        { title: 'Movie', value: 'movie' },
        { title: 'TV Series', value: 'series' },
        { title: 'TV Series Episode', value: 'episode' },
    ];

    const [selectedMovieType, setSelectedMovieType] = useState<Types>({ title: 'All', value: 'all' });

    const [searchValue, setSearchValue] = useState('');

    const handleChangeMovieType = (event: SelectChangeEvent) => {
        const selectedMovieType = event.target.value as string;
        const foundIndexMovieType = movieTypeList.findIndex(mt => mt.value === selectedMovieType);

        if (foundIndexMovieType === -1) {
            return;
        }
        setSelectedMovieType(movieTypeList[foundIndexMovieType]);
        onSelectedType(selectedMovieType)

    }

    const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value as string;
        setSearchValue(searchValue);

        if (searchValue && searchValue.length > 2) {
            setTimeout(() => {
                onSearch(searchValue);
            }, 100);
        }
    }

    return (
        <Box className={styles.container}>
            <TextField className={styles.searchbar} value={searchValue} onInput={handleInputSearch} placeholder='Search...' />
            <FormControl >
                <Select className={styles.typeSelect} value={selectedMovieType.value} onChange={handleChangeMovieType}>
                    {movieTypeList.map((movieType, index) => <MenuItem key={index} value={movieType.value}>{movieType.title}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}
