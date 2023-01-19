import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MovieCard(props) {
  return (
    <Card style={{ width: '18rem' }} className="card-item">
      <Card.Img variant="top" src={props.img} className="card-image" />
      <Card.Body>
        <Card.Title className="card-title">{props.title}</Card.Title>
        <p className='release-date'>{props.releaseDate}</p>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;