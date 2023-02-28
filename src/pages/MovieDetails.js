import { useEffect, useState } from "react";
import axios from "../axios";
import { useParams, Link } from "react-router-dom";
import { formatMovieDuration, getReleaseYear, formatDateNumeric } from "../utils.ts";
import { imgBasePath } from "../constants";
import ActorCard from "../components/ActorCard"
import EmptyCard from "../components/EmptyCard";
import ShortcutBar from "../components/ShortcutBar";
import FactsItem from "../components/FactsItem";
import SocialMedia from "../components/SocialMedia";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMovieDetails,
  selectLanguages,
  selectMovieDetails
} from '../features/slices/movies';


function MovieDetails() {
  const { movieId } = useParams()
  const dispatch = useDispatch();
 
  // const [movieDetails, setMovieDetails] = useState(null)
  const [movieCast, setMovieCast] = useState([])
  const [movieCrew, setMovieCrew] = useState([])
  const [certification, setCertification] = useState("")
  const [releaseDates, setReleaseDates] = useState("")
  const [keywords, setKeywords] = useState([])
  const [movieCredits, setMovieCredits] = useState([])
  const [socialId, setsocialId] = useState([])

  const languages = useSelector(selectLanguages);

  function temporarySelector(state) {
    return selectMovieDetails(state, movieId)
  }

  const movieDetails = useSelector(temporarySelector);

  //Fetch Movies' Details
  useEffect(() => {
    if (!movieDetails) {
      dispatch(fetchMovieDetails(movieId))
    }
  }, [dispatch])

  //Fetch Movies' Credits (Crew and Cast)
  useEffect(() => {
    axios
      .get(`/movie/${movieId}/credits?language=en-US`)
      .then(function (response) {
        setMovieCast(response.data.cast);
        setMovieCrew(response.data.crew);
        setMovieCredits(response.data)
      })
      .catch(function (error) {
        console.log(error, movieCast);
      })
  }, [movieId])

  //Fetch Movies' External ID
  useEffect(() => {
    axios
      .get(`/movie/${movieId}/external_ids?language=en-US`)
      .then(function (response) {
        setsocialId(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [movieId])

  //Get the 9 Top Billed Cast
  const topBilledCast = movieCast.slice(0, 9);

  //Hardcoded solution for setting Movies' Certification and Release Dates 
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

  //Fetch Movies' Keywords
  useEffect(() => {
    axios
      .get(`/movie/${movieId}/keywords`)
      .then(function (response) {
        setKeywords(response.data.keywords)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [movieId])

  if (!movieDetails) {
    return <p>Loading...</p>
  }

  //Sets original Language
  const originalLanguage = movieDetails.original_language;
  const originalLanguageName = languages.find(language => language.iso_639_1 === originalLanguage).english_name;

  return (
    <div className="movie-details">
      <ShortcutBar />
      <div className="overview-image" style={{ backgroundImage: `url(${imgBasePath + "w1280" + movieDetails.backdrop_path})` }}>
        <section className="overview row">
          <div className="poster-img-container col-2">
            <img className="poster-img" src={imgBasePath + "w300_and_h450_bestv2" + movieDetails.poster_path} alt="poster" />
          </div>
          <div className="overview-details col">
            <p className="title">{movieDetails.title} <span className="title-release-year">({getReleaseYear(movieDetails.release_date)})</span></p>
            <div className="under-title"><span className="certification">{"[" + certification + "]"}</span><span>{" " + formatDateNumeric(releaseDates) + " (DE)"}</span> •
              {movieDetails.genres.map((genre, index) => {
                return <span key={genre.id}> { (index ? ', ' : '') + genre.name }</span>;
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
      <div className="row">
        <div className="left-side col-8">
          <div>
            <h3>Top Billed Cast</h3>
            <div className="cast-scroller scroller-wrap should-fade is-fading">
              <div className="people scroller">
                {topBilledCast.map((actor) => {
                  return <ActorCard
                    className={"actors-card"}
                    key={actor.id}
                    name={actor.name}
                    character={actor.character}
                    img={actor.profile_path}
                    id={actor.id}
                    gender={actor.gender}
                  />
                })}
                <EmptyCard
                  className="empty-card"
                  movieCreditsId={movieCredits.id}
                >View More</EmptyCard>
              </div>
            </div>
            <Link to={`/movie/${movieCredits.id}/cast`} className='link empty-card'>
              <p className="cast-crew">Full Cast & Crew </p>
            </Link>
            <hr />
          </div>
        </div>
        <div className="right-side col-4">
          <SocialMedia
           facebookId={socialId.facebook_id}
           twitterId={socialId.twitter_id}
           instagramId={socialId.instagram_id}
          />
          <FactsItem
            name="Original Title"
            value={movieDetails.original_title}
            className={movieDetails.original_language === "en" ? "hide" : "original-title"}
          />
          <FactsItem
            name="Status"
            value={movieDetails.status}
            className="status"
          />
          <FactsItem
            name="Original Language"
            value={originalLanguageName}
            className="original-language"
          />
          <FactsItem
            name="Budget"
            value={movieDetails.budget > 0 ? "$" + movieDetails.budget.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "-"}
            className="budget"
          />
          <FactsItem
            name="Revenue"
            value={movieDetails.revenue > 0 ? "$" + movieDetails.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "-"}
            className="revenue"
          />
          <section className="keywords">
            <h4>Keywords</h4>
            {keywords.map((keyword) => {
              return <button key={keyword.id} type="button" className="btn btn-light">{keyword.name}</button>
            })}
          </section>
          <hr />
        </div>
      </div>


    </div>
  );
}

export default MovieDetails;
