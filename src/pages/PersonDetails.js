import { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function PersonDetails() {
  const { personId } = useParams()
  const [personDetails, setPersonDetails] = useState(null)
  const [knownFor, setKnownFor] = useState([])

  useEffect(() => {
    axios
      .get(`/person/${personId}?language=en-US`)
      .then(function (response) {
        setPersonDetails(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [personId])

  useEffect(() => {
    axios
      .get(`/discover/movie?language=en-US&with_people=${personId}`)
      .then(function (response) {
        setKnownFor(response.data.results)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [personId])

  if (personDetails === null) {
    return <p>Loading...</p>
  }

  return (
    <div className="movie-details">
      <p>NAME: {personDetails.name}</p>
      <p>Known For</p>
        {knownFor.map((item) => {
          return <MovieCard  
            key={item.id}
            title={item.title}
            img={item.poster_path}
            releaseDate={item.release_date}
            id={item.id}
          />
        })}
    </div>
  );
}

export default PersonDetails;
