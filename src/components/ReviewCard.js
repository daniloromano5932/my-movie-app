import Card from 'react-bootstrap/Card';
import { formatDateLongMonth } from "../utils.ts"
import Badge from 'react-bootstrap/Badge';


function ReviewCard(props) {
  return (
    <Card style={{ width: '1000px', height: '260px' }} className="card-shadow">
      <Card.Body>
        <div className='row'>
          <div className='col-1 review-img-container'>
            <img className='review-img' src={props.img} />
          </div>
          <div className='col-10'>
            <Card.Title className='review-title' >A review by {props.author + " "}
               <Badge bg="dark">☆ {props.rating}</Badge>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Written by {props.author} on {formatDateLongMonth(props.date)}
            </Card.Subtitle>
            <br/>
            <Card.Text style={{ height: "10rem"}}>
              <div className='more'>
            {props.review.split('\r\n\r\n').map((reviewItem) => {
              return <p>{reviewItem}</p>
            })}
            </div><p style={{textDecoration: "underline"}}>Read the rest</p>
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;