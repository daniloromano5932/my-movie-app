import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { getReleaseDate } from "../utils";
import { imgBasePath } from "../constants";

function MovieCard(props) {

  return (
    <Card className="card-item">
      <Link to={'/movie/' + props.id}>
        {props.img && <Card.Img variant="top" src={imgBasePath + "w500" + props.img} className="card-image" />}
      </Link>
      <Card.Body>
        <Link to={'/movie/' + props.id} className='link'><Card.Title className="card-title">{props.title}</Card.Title></Link>
        <p className='release-date'>{getReleaseDate(props.releaseDate)}</p>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;