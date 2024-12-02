import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { Movie } from './components/Movie';

export const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<Movie />} />
    </Routes>
  </Router>
  )
}
