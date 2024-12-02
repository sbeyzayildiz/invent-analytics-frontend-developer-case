import React, { useState } from 'react'
import { Pagination } from '@mui/material'
import styles from './style.module.scss';

interface Paginationbar {
    onChangePage: (value:number) => void;
}

export const Paginationbar: React.FC<Paginationbar> = ({onChangePage}) => {
    const [page, setPage] = useState(1);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        onChangePage(value)
    }

    return (
        <Pagination className={styles.paginationContainer} count={10} shape="rounded" page={page} onChange={handleChangePage} color='primary' />

    )
}

