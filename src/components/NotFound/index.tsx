import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import styles from './style.module.scss'
export const NotFound = () => {
  return (
    <div className={styles.container}>
    <SentimentVeryDissatisfiedIcon />
    <p>Sorry, not found any results...</p>
    </div>
  )
}

