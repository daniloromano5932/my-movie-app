import { imgBasePath } from "../constants";
import { getReleaseYear } from "../utils.ts";
import { Link } from "react-router-dom";

function MovieTitleBar(props) {
  return <div>
  <div className="movie-title-container" style={{backgroundImage: `url(${imgBasePath + "original" + props.backdropPath})`}}>
  <div className="row">
    <Link to={`/movie/${props.movieId}`} className="movie-title-img"><img src={imgBasePath + "w58_and_h87_face" + props.posterPath} /></Link>
    <div className="movie-details col">
      <p className="movie-title"><Link to={`/movie/${props.movieId}`} className="link">{props.title}</Link><span className="movie-year"> {`(${getReleaseYear(props.releaseDate)})`}</span></p>
      <Link className="back-to-main" to={`/movie/${props.movieId}`}>← Back to main</Link>
    </div>
  </div>
  </div>
  </div>
}

export default MovieTitleBar;