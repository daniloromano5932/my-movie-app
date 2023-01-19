
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
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [slug, activePage])

  return (
    <Container>
      <div className='row col '>
        {movies.map(movie => <MovieCard 
          key={movie.id}
          title={movie.title}
          img={imgBasePath+movie.poster_path}
          />
          )}
        <Pagination handlePageChange={handlePageChange} activePage={activePage} />
      </div>
    </Container>

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Movies() {

  const [data, setData] = useState([])
  let {slug} = useParams();

  useEffect(function() {
    axios.get(`https://api.themoviedb.org/3/movie/${slug.replace(/-/g, '_')}?api_key=d2f6811ad1ffa9ad4c06382bf50da010&language=en-US&page=1`)
    .then(function(response) {
      setData(response.data.results)
      console.log(data);
    })
  }, [slug, data])
    

  return (
    <div>
      {data.map((item) => {
        return <p key={item.id}>{item.title}</p>
      })}
    </div>

  );
}

export default Movies;
