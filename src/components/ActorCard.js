import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { imgBasePath, tp, glyphiconsBasePath } from "../constants";

function ActorCard(props) {

  //Sets Actors' Cards Pictures (based on known/unknown pic and gender)
  function setActorCardPic() {
    if (props.img !== null) {
      return imgBasePath + tp + "w300" + props.img;
    } else {
      if (props.gender === 2 || props.gender === 0) {
        return glyphiconsBasePath + "4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
      } else if (props.gender === 1) {
        return glyphiconsBasePath + "36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg";
      }
    }
  }

  return (
    <Card className="actor-card-item">
      <Link to={"/person/" + props.id}>
        {<Card.Img variant="top" src={setActorCardPic()} className="card-image" />}
      </Link>
      <Card.Body>
        <Link to={"/person/" + props.id} className='link'>
          <Card.Title className="actor-card-title">{props.name}</Card.Title>
        </Link>
        <p className='character'>{props.character}</p>
      </Card.Body>
    </Card>
  );
}

export default ActorCard;