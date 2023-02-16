import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { imgBasePath, tp } from '../constants';
import { glyphiconsBasePath } from '../constants';

function SimpleMovieCard(props) {

  return (
    <Card className="actor-card-item simple-card" style={{ borderWidth: "0" }}>
      <Card.Body>
        <Link to={'/movie/' + props.id}>
          {<Card.Img variant="top"
            src={props.img !== null ? imgBasePath + tp + "w500" + props.img : glyphiconsBasePath +
              "38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"}
            className="simple-card-image card-image" />}
        </Link>
        <Link to={'/movie/' + props.id} className="link">
          <p className='known-as-card simple-card-title'>{props.title}</p>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default SimpleMovieCard;