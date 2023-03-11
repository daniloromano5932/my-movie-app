import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function EmptyCard(props) {

  return (
    <Card className="actor-card-item" style={{ borderWidth: "0" }}>
      <Card.Body>
        <Link to={`/movie/${props.movieCreditsId}/cast`} className='link empty-card'>
          <p className='view-more'>View More<span className='glyphicons_v2 arrow-thin-right'></span></p>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default EmptyCard;