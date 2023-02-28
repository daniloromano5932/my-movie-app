import axios from '../axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Pagination from "../components/Pagination";
import Container from 'react-bootstrap/Container';
import MovieCard from '../components/MovieCard';
import Filter from "../components/Filter";
import { useSelector } from 'react-redux';
import {selectLanguages} from '../features/slices/movies';

function Movies() {
  const languages = useSelector(selectLanguages);
  const { slug } = useParams()
  const moviesType = slug.replace('-', '_');
  const [movies, setMovies] = useState([])
  const [activePage, setActivePage] = useState(1)


  function handlePageChange(page) {
    setActivePage(page)
  }

  //Fetch Movies
  useEffect(() => {
    axios
      .get(`/movie/${moviesType}?&page=${activePage}`)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [slug, activePage, moviesType])

  function searchByGenres(selectedGenresString) {
    axios
      .get(`/discover/movie?with_genres=${selectedGenresString}`)
      .then(function (response) {
        setMovies(response.data.results)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function selectLanguage(selectedLanguage) {
    if (selectedLanguage === "none") {
    } else {
      axios
        .get(`/discover/movie?with_original_language=${selectedLanguage}`)
        .then(function (response) {
          setMovies(response.data.results)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  function handleFilter(query) {
    axios
      .get(`/discover/movie?sort_by=${query}`)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <Container>
      <div className='row'>
        <div className="row col-3">
          <Filter
            handleFilter={handleFilter}
            searchByGenres={searchByGenres}
            searchByLanguage={selectLanguage}
            languages={languages}
          />
        </div>
        <div className='row col cards-container'>
          {movies.map(function (movie) {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                img={movie.poster_path}
                releaseDate={movie.release_date}
                id={movie.id}
              />
            )
          })}
          <Pagination
            handlePageChange={handlePageChange}
            activePage={activePage}
          />
        </div>
      </div>
    </Container>
  )
}

export default Movies;
