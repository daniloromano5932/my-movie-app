import { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { imgBasePath } from "../constants";
import { formatDate, calculateDateDifferenceInYears } from "../utils.ts";
import SimpleMovieCard from "../components/SimpleMovieCard";
import SideLoginAndKeyboard from "../components/SideLoginAndKeyboard";
import ShortcutBar from "../components/ShortcutBar";
import FactsItem from "../components/FactsItem";
import SocialMedia from "../components/SocialMedia";

function PersonDetails() {

  const { personId } = useParams()
  const [personDetails, setPersonDetails] = useState(null)
  const [knownFor, setKnownFor] = useState([])
  const [socialId, setsocialId] = useState({})
  const [movieCredits, setMovieCredits] = useState([])
  const [tvCredits, setTvCredits] = useState([])

  //Fetch Persons' Details
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

  console.log(personDetails)

  //Temporary Solution for Known For
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

  //Fetch Social Media IDs
  useEffect(() => {
    axios
      .get(`/person/${personId}/external_ids`)
      .then(function (response) {
        setsocialId(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [personId])

  //Fetch Person is Crew/Cast in Movies 
  useEffect(() => {
    axios
      .get(`/person/${personId}/movie_credits`)
      .then(function (response) {
        setMovieCredits(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [personId])

  //Fetch Person is Crew/Cast in TV Shows
  useEffect(() => {
    axios
      .get(`/person/${personId}/tv_credits`)
      .then(function (response) {
        setTvCredits(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [personId])

  //Handle Delay in Fetching
  if (personDetails === null) {
    return <p>Loading...</p>
  }

  if (movieCredits.length === 0 || tvCredits.length === 0) {
    return <p>Loading...</p>
  }

  //Handle Actors' Main Pic
  function setActorMainPic() {
    if (personDetails.profile_path !== null) {
      return imgBasePath + "w300_and_h450_bestv2" + personDetails.profile_path;
    } else {
      if (personDetails.gender === 2 || personDetails.gender === 0) {
        return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
      } else if (personDetails.gender === 1) {
        return "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg"
      }
    }
  }

  //Temporary Solution for Sorting Release Years of Movies in which the Person was Cast
  // function getReleaseYear() {
  //   const releaseDates = movieCredits.cast.map((year) => year.release_date);
  //   var releaseYears = 0;
  //   releaseYears = releaseDates.map((date) => new Date(date).getFullYear());
  //   var validYears = releaseYears.map(function (year) {
  //     let item;
  //     if (isNaN(year)) {
  //       item = "-";
  //     } else {
  //       item = year;
  //     }
  //     return item
  //   })
  //   return validYears
  // }
  // const validYears = getReleaseYear()
  //Total of Movies/TV Shows in which a Person was Cast/Crew (Known Credits)
  const castIn = (movieCredits.cast.length + tvCredits.cast.length)
  const crewIn = (movieCredits.crew.length + tvCredits.crew.length)
  const temporaryKnownCredits = castIn + crewIn;

  return (
    <div className="movie-details">
      <ShortcutBar />
      <hr />
      <div className="row details-wrapper">
        <div className="left-side col-3">
          <div>
            <img className="actor-pic" src={setActorMainPic()} />
          </div>
          <div className="social-media row">
            <SocialMedia
            facebookId={socialId.facebook_id}
            twitterId={socialId.twitter_id}
            instagramId={socialId.instagram_id}
            />
          </div>
          <h3 className="personal-info">
            <bdi>
              Personal Info
            </bdi>
          </h3>
          <section>
            <FactsItem
              name="Known For"
              value={personDetails.known_for_department}
            />
            <FactsItem
              name="Known Credits"
              value={temporaryKnownCredits}
              className="red"
            />
            <FactsItem
              name="Gender"
              value={personDetails.gender === 1 ? "Female" : personDetails.gender === 2 ? "Male" : "-"}
            />
            <FactsItem
              name="Birthdate"
              value={personDetails.birthday !== null ? `${formatDate(personDetails.birthday)} (${calculateDateDifferenceInYears(personDetails.birthday)} years old)` : "-"}
              className="birth-date"
            />
            <FactsItem
              name="Day of Death"
              value={personDetails.deathday !== null ? `${formatDate(personDetails.deathday)} (${calculateDateDifferenceInYears(personDetails.birthday, personDetails.deathday)} years old)` : "-"}
              className={personDetails.deathday === null ? "hide" : "birth-date"}
            />
            <FactsItem
              name="Place of Birth"
              value={personDetails.place_of_birth !== null ? personDetails.place_of_birth : "-"}
            />
            <div className="known-as">
              <FactsItem
                name="Also Known As"
              />
              <ul >
                {personDetails.also_known_as.length === 0 ? "-" : personDetails.also_known_as.map((name) => {
                  return <li className="actor-names" key={name}>{name}</li>
                })}
              </ul>
            </div>
          </section>
          <SideLoginAndKeyboard />
        </div>
        <div className="actor-right-side col-9">
          <section>
            <h2 className="actor-name">{personDetails.name}</h2>
          </section>
          <section className="biography">
            <h3 className="biography-title">Biography</h3>
            <p>{personDetails.biography === "" ? `We don't have a biography for ${personDetails.name}.` : personDetails.biography.split('\n\n').map((biographyItem) => <p>{biographyItem}</p>)}</p>
          </section>
          <p className="known-for">Known For</p>
          <div>
            <div className="cast-scroller scroller-wrap should-fade is-fading">
              <div className="people scroller">
                {knownFor.map((item) => {
                  return <SimpleMovieCard
                    key={item.id}
                    title={item.title}
                    img={item.poster_path}
                    id={item.id}
                  />
                })}
              </div>
            </div>
          </div>
          <section className="full_wrapper credits">
            <div className="credits_list">
              <h3>Acting</h3>
              {/* <table>
                <tbody>
                  {validYears.map((year) => <tr><td>{year}</td></tr>)}
                </tbody>
              </table> */}
            </div>
            <div className="credit_filters"></div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
