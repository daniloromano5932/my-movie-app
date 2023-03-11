import ShortcutBar from "../components/ShortcutBar"
import axios from "../axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Troupe from "../components/Troupe"
import { Link } from "react-router-dom"
import { imgBasePath } from "../constants"
import { getReleaseYear} from "../utils.ts"
import MovieTitleBar from "../components/MovieTitleBar"

function MovieCredits() {
  const { movieId } = useParams()
  const [movieCast, setMovieCast] = useState([])
  const [movieCrew, setMovieCrew] = useState([])
  const [movieDetails, setMovieDetails] = useState([])
  const [movieLists, setMovieLists] = useState([])

  useEffect(() => {
    axios
      .get(`/movie/${movieId}/credits?language=en-US`)
      .then(function (response) {
        setMovieCast(response.data.cast);
        setMovieCrew(response.data.crew);
      })
      .catch(function (error) {
        console.log(error, movieCast);
      })
  }, [movieId])

  //Fetch Movie Details for Img
  useEffect(() => {
    axios
      .get(`/movie/${movieId}?language=en-US`)
      .then(function (response) {
        setMovieDetails(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [movieId])

  if (movieCast.length === 0 || movieCrew.length === 0 || movieDetails.length === 0) {
    return <p>Loading...</p>
  }

  if (movieId === null) {
    return <p>Loading...</p>
  }

  //Sorts Movies' Crew's Departments Alphabetically
  const sortedByJob = movieCrew.sort(function (a, b) {
    if (a.job < b.job) {
      return -1;
    }
    if (a.job > b.job) {
      return 1
    }
    return 0;
  });

  const sortedByDepartment = movieCrew.sort(function (a, b) {
    if (a.department < b.department) {
      return -1;
    }
    if (a.job > b.job) {
      return 1
    }
    return 0
  });

  const listofDepartments = sortedByDepartment.map((crew) => crew.department)
  const departments = [...new Set(listofDepartments)]
console.log(movieDetails)

  return (
    <div>
      <ShortcutBar />
      <MovieTitleBar
      movieId={movieId}
      releaseDate={movieDetails.release_date}
      backdropPath={movieDetails.backdrop_path}
      title={movieDetails.title}
      posterPath={movieDetails.poster_path}
      />
      <section className="cast-crew">
        <div className="row">
          <div className="left-side col-6 cast-column">
            <h3 className="cast-column-title">Cast <span className="cast-crew-total">{movieCast.length}</span></h3>
            {movieCast.map((castMember) => {
              return <Troupe
                name={castMember.name}
                character={castMember.character}
                img={castMember.profile_path}
                gender={castMember.gender}
                key={castMember.id}
                id={castMember.id}
              />
            })}
          </div>
          <div className="right-side col-6">
            <h3 className="cast-column-title">Crew <span className="cast-crew-total">{sortedByJob.length}</span></h3>
            {departments.map((department) => {
              return <div key={department}><p>{department}</p>
                {sortedByJob.filter((crew) => crew.department === department).map((job) => {
                  return <div>
                    <Troupe
                      name={job.name}
                      character={job.job}
                      img={job.profile_path}
                      key={job.id}
                      gender={job.gender}
                      id={job.id}
                    />
                  </div>
                })}
              </div>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MovieCredits