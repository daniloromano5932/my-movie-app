import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReviewCard from "../components/ReviewCard";
import axios from "../axios";

import { useSearchParams, useParams, Link } from "react-router-dom";
import { formatMovieDuration, getReleaseYear, formatDateNumeric } from "../utils.ts";
import { imgBasePath } from "../constants";
import ActorCard from "../components/ActorCard"
import EmptyCard from "../components/EmptyCard";
import ShortcutBar from "../components/ShortcutBar";
import FactsItem from "../components/FactsItem";
import SocialMedia from "../components/SocialMedia";
import SideLoginAndKeyboard from "../components/SideLoginAndKeyboard"
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMovieDetails,
  selectLanguages,
  selectMovieDetails,
  fetchExternalIds,
  selectExternalIds,
  fetchKeywords,
  selectKeywords,
  selectMovieCredits,
  fetchMovieCredits,
} from '../features/slices/movies';
// import {
//   selectSession,
//   fetchSessionId
// } from "../features/slices/authentication"

function MovieDetails() {
  const { movieId } = useParams();
  // const [searchParams] = useSearchParams()
  const dispatch = useDispatch();

  const [certification, setCertification] = useState("")
  const [releaseDates, setReleaseDates] = useState("")
  const [reviews, setReviews] = useState([])

  const languages = useSelector(selectLanguages);


  function temporarySelector(state) {
    return selectMovieDetails(state, movieId)
  }

  function passIdToExternalId(state) {
    return selectExternalIds(state, movieId)
  }

  function passIdtoCredits(state) {
    return selectMovieCredits(state, movieId)
  }

  const movieDetails = useSelector(temporarySelector);
  const externalIds = useSelector(passIdToExternalId);
  const keywords = useSelector(selectKeywords);
  const movieCredits = useSelector(passIdtoCredits);


  //Fetch Movies' Details
  useEffect(() => {
    if (!movieDetails) {
      dispatch(fetchMovieDetails(movieId))
    }
  }, [dispatch])

  //Fetch Movies' Credits (Crew and Cast)
  useEffect(() => {
    if (!movieCredits) {
      dispatch(fetchMovieCredits(movieId))
    }
  }, [dispatch])

  //Fetch Movies' External ID
  useEffect(() => {
    if (!externalIds) {
      dispatch(fetchExternalIds(movieId))
    }
  }, [dispatch])

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
    if (keywords.length === 0) {
      dispatch(fetchKeywords(movieId))
    }
  }, [dispatch])

  useEffect(() => {
    axios
      .get(`/movie/${movieId}/reviews`)
      .then(function (response) {
        setReviews(response.data.results)
      })
  }, [movieId])

  const [change, setChange] = useState({})

  // useEffect(() => {
  //   const request_token = searchParams.get('request_token')
  //   if (request_token) {
  //     // axios
  //     //   .post("/authentication/session/new", { request_token })
  //     //   .then(function(response) {
  //     //     console.log("token",response)
  //     //   })
  //     //   .catch(function(error) {
  //     //     console.log(error);
  //     //   })
  //     dispatch(fetchSessionId(request_token))
  //   }
  // }, [dispatch])

  // function authenticateToken() {
  //   axios
  //   .get("/authentication/token/new")
  //   .then(function(response) {
  //     console.log("response", response)
  //     window.location = `https://www.themoviedb.org/authenticate/${response.data.request_token}?redirect_to=http://localhost:3000/movie/${movieId}`
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   })
  // } 

  // const sessionId = useSelector(selectSession)
  // console.log("sessionID",sessionId.session_id)

  if (!movieDetails || !externalIds || !keywords || !movieCredits || !languages.length || !reviews.length) {
    return <p>Loading...</p>
  }

  //Sets original Language
  const originalLanguage = movieDetails.original_language;
  const originalLanguageName = languages.find(language => language.iso_639_1 === originalLanguage).english_name;

  //Get the 9 Top Billed Cast
  const topBilledCast = movieCredits.cast.slice(0, 9);

  //Pick random reviews object
  const randomReview = reviews[Math.floor(Math.random() * reviews.length)]
  
  function changeReview() {
    
  }
  
  return (
    <div className="movie-details"> 
      <ShortcutBar />
      <div className="overview-image" style={{ backgroundImage: `url(${imgBasePath + "w1280" + movieDetails.backdrop_path})` }}>
        <section className="overview row">
          <div className="poster-img-container col-2">
            <img className="poster-img" src={imgBasePath + "w300_and_h450_bestv2" + movieDetails.poster_path} alt="poster" />
          </div>
          <div className="overview-details col">
            <div className="details-container">
              <p className="title">{movieDetails.title} <span className="title-release-year">({getReleaseYear(movieDetails.release_date)})</span></p>
              <div className="under-title"><span className="certification">{"[" + certification + "]"}</span><span>{" " + formatDateNumeric(releaseDates) + " (DE)"}</span> •
                {movieDetails.genres.map((genre, index) => {
                  return <span key={genre.id}> {(index ? ', ' : '') + genre.name}</span>;
                })
                } • <span>{formatMovieDuration(movieDetails.runtime)}</span>
              </div>
              <div className="score">
                <button className="vote-average">{Math.round(movieDetails.vote_average * 10)}%</button>
                <div className="user-score">
                  <p>User <br /> Score </p>
                </div>
              </div>
              <button>♥️</button>
              <button>☰</button>
              <button>🔖</button>
              <button>☆</button>
              <p className="tagline">{movieDetails.tagline}</p>
              <p className="overview-title">Overview</p>
              <p className="overview-text">{movieDetails.overview}</p>
              {/* <ol className="crew">
          {
            console.log(movieCrew)
          }
          </ol> */}
            </div>
          </div>
        </section>
      </div>
      <div className="row">
        <div className="left-side col-8">
          <div>
            <h3 className="top-billed">Top Billed Cast</h3>
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
            <Link to={`/movie/${movieCredits.id}/cast`} className='link'>
              <p className="cast-crew">Full Cast & Crew </p>
            </Link>
            <hr />
            <h4>Social</h4>
            <Tabs
              defaultActiveKey="reviews"
              // activeKey="underlined"
              id="fill-tab-example"
              className="mb-3 reviews"
              variant="pills"
            >
              <Tab eventKey="reviews" title={`Reviews ${reviews.length}`} tabClassName="reviews" onClick={changeReview} >
                <ReviewCard
                author={randomReview.author}
                date={randomReview.created_at}
                review={randomReview.content}
                //FIX !!!!!!
                img={randomReview.author_details.avatar_path[1] === "h" ? randomReview.author_details.avatar_path.substring(1) : randomReview.author_details.avatar_path }
                rating={randomReview.author_details.rating}
                />
              </Tab>
              <Tab eventKey="discussions" tabClassName="discussions" title="Discussions">
                <p>discussions</p>
              </Tab>
            </Tabs>
            <p className="cast-crew">Read All Reviews </p>
          </div>
        </div>
        <div className="right-side col-3">
          <SocialMedia
            facebookId={externalIds.facebook_id}
            twitterId={externalIds.twitter_id}
            instagramId={externalIds.instagram_id}
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
          <SideLoginAndKeyboard />
        </div>
      </div>


    </div>
  );
}

export default MovieDetails;
