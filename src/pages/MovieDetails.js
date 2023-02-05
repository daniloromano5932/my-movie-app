import { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { formatMovieDuration, getReleaseYear, getReleaseDateNumeric } from "../utils";
import { Link } from "react-router-dom";
import { imgBasePath } from "../constants";
import ActorCard from "../components/ActorCard"

function MovieDetails() {
  const { movieId } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [movieCast, setMovieCast] = useState([])
  const [movieCrew, setMovieCrew] = useState([])
  const [certification, setCertification] = useState("")
  const [releaseDates, setReleaseDates] = useState("")

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

  useEffect(() => {
    axios
      .get(`/movie/${movieId}/credits?language=en-US`)
      .then(function (response) {
        setMovieCast(response.data.cast.slice(0, 9));
        setMovieCrew(response.data.crew)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [movieId])

  useEffect(() => {
    axios
      .get(`/movie/${movieId}/release_dates?language=en-US`)
      .then(function (response) {
        const countries = response.data.results
        const countryDE = countries.find(element => element.iso_3166_1 === "DE");
        const certification = countryDE.release_dates[0].certification;
        const releaseDate = countryDE.release_dates[0].release_date;
        setCertification(certification)
        setReleaseDates(releaseDate)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [movieId])



  if (movieDetails === null) {
    return <p>Loading...</p>
  }

console.log(movieCast)

  return (
    <div className="movie-details">
      <div>Overview, Media, Fandom, Share</div>
      <div className="overview-image" style={{backgroundImage:`url(${imgBasePath + "w1280" + movieDetails.backdrop_path})` }}>
      <section className="overview row">
        <div className="poster-img-container col-2">
          <img className="poster-img" src={imgBasePath + "w300_and_h450_bestv2" + movieDetails.poster_path} alt="poster" />
        </div>
        <div className="overview-details col">
          <p className="title">{movieDetails.title} <span className="title-release-year">({getReleaseYear(movieDetails.release_date)})</span></p>
          <div className="under-title"><span className="certification">{"[" + certification + "]"}</span><span>{" " + getReleaseDateNumeric(releaseDates) + " (DE)"}</span> •  
          {movieDetails.genres.map((genre) => {
            return " " + genre.name + ",";
          })
          } • <span>{formatMovieDuration(movieDetails.runtime)}</span>
          </div>
          <p className="vote-average">{Math.round(movieDetails.vote_average * 10)}%</p>
          <p className="tagline">{movieDetails.tagline}</p>
          <p className="overview-title">Overview</p>
          <p className="overview-text">{movieDetails.overview}</p>
          {/* <ol className="crew">
          {
            console.log(movieCrew)
          }
          </ol> */}
        </div>
      </section>
      </div>
      <section>
        <div className="left-side">
        <h3>Top Billed Cast</h3>
          <div className="cast-scroller scroller-wrap should-fade is-fading">
          <div className="people scroller">
            {movieCast.map((actor) => {
              return <ActorCard
              className={"actors-card"}
              key={actor.id}
              name={actor.name}
              character={actor.character}
              img={actor.profile_path}
              />
            })}
          </div>
          </div>
        </div>
        <aside>
        </aside>
        
      </section>
    </div>
  );
}

export default MovieDetails;
