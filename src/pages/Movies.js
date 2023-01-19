
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { BASE_URL, API_KEY } from '../constants';
import Pagination from "../components/Pagination";
import Container from 'react-bootstrap/Container';
import MovieCard from '../components/MovieCard';

function Movies() {
  const { slug } = useParams()
  const moviesType = slug.replace('-', '_');
  const imgBasePath = "https://image.tmdb.org/t/p/w500"; 

  const [movies, setMovies] = useState([])
  const [activePage, setActivePage] = useState(1)

  function handlePageChange(page) {
    setActivePage(page)
  }

  useEffect(() => {
    axios
    .get(`${BASE_URL}/movie/${moviesType}?${API_KEY}&page=${activePage}`)
    .then(function (response) {
      setMovies(response.data.results);
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [slug, activePage])


  return (
    <Container className='cards-container'>
      <div className='row'>
      <div className='row col'>
        {movies.map(function(movie) { 
          const releaseDate = movie.release_date;
          const [year, month, day] = releaseDate.split('-');
          const result = [day, month, year].join(' ');
          
          return (
          <MovieCard 
          key={movie.id}
          title={movie.title}
          img={imgBasePath+movie.poster_path}
          releaseDate={result}
          />
        )}
          )}
          </div>
        <Pagination handlePageChange={handlePageChange} activePage={activePage} />
      </div>
    </Container>
  )
}

export default Movies;
