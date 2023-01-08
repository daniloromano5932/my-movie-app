import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { BASE_URL, API_KEY } from '../constants';
import Pagination from "../components/Pagination";
import Container from 'react-bootstrap/Container';

function Movies() {
  const { slug } = useParams()
  const moviesType = slug.replace('-', '_')

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
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [slug, activePage])

  return (
    <Container>
      <div>
        {movies.map(movie => <div key={movie.id}>{movie.title}</div>)}
        <Pagination handlePageChange={handlePageChange} activePage={activePage} />
      </div>
    </Container>
  );
}

export default Movies;
