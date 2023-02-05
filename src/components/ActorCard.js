import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { getReleaseDate } from "../utils";
import { imgBasePath } from "../constants";

function MovieCard(props) {

  return (
    <Card className="actor-card-item">
      <Link to={"/"}>
        {props.img && <Card.Img variant="top" src={imgBasePath + "w300" + props.img} className="card-image" />}
      </Link>
      <Card.Body>
        <Link to={"/"} className='link'><Card.Title className="card-title">{props.name}</Card.Title></Link>
        <p className='character'>{props.character}</p>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;