import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from "./pages/MovieDetails";
import PersonDetails from "./pages/PersonDetails";
import MovieCast from "./pages/MovieCast.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchLanguages,
  selectLanguages,
  selectGenres,
  fetchGenres
} from './features/slices/movies';

function App() {
  const dispatch = useDispatch();

  // Fetch languages
  useEffect(() => {
    dispatch(fetchLanguages())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchGenres())
  }, [dispatch])

  const languages = useSelector(selectLanguages);
  const genres = useSelector(selectGenres);

  // Handle delay in fetching languages
  if (languages.length === 0) {
    return <p>Loading...</p>
  }

  if (genres.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:slug" element={<Movies />} />
        <Route path="movie/:movieId" element={
          <MovieDetails />} />
        <Route path="person/:personId" element={<PersonDetails />} />
        <Route path="/movie/:movieId/cast" element={<MovieCast />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
