import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { formatDate } from "../utils.ts";
import { imgBasePath, tp } from "../constants";

function MovieCard(props) {

  return (
    <Card className="card-item">
      <Link to={'/movie/' + props.id}>
        {props.img && <Card.Img variant="top" src={imgBasePath + tp + "w500" + props.img} className="card-image" />}
      </Link>
      <Card.Body>
        <Link to={'/movie/' + props.id} className='link'><Card.Title className="movie-card-title">{props.title}</Card.Title></Link>
        <p className='release-date'>{formatDate(props.releaseDate)}</p>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;