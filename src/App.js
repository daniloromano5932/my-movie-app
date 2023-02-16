import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from "./pages/MovieDetails";
import PersonDetails from "./pages/PersonDetails";
import MovieCast from "./pages/MovieCast.js";
import { useEffect, useState } from "react";
import axios from './axios';

function App() {

  const [languages, setLanguages] = useState([])

  //Fetch languages
  useEffect(() => {
    axios
      .get(`/configuration/languages`)
      .then(function (response) {
        setLanguages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  //Handle delay in fetching languages
  if (languages.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:slug" element={<Movies languages={languages} />} />
        <Route path="movie/:movieId" element={
          <MovieDetails
            languages={languages}
          />} />
        <Route path="person/:personId" element={<PersonDetails />} />
        <Route path="/movie/:movieId/cast" element={<MovieCast />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
