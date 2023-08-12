import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";

function ReviewPage() {
  const [travelDestinations, setTravelDestinations] = useState([
    { id: 1, name: "Destination 1", rating: 4.5 },
    { id: 2, name: "Destination 2", rating: 3.8 },
    { id: 3, name: "Destination 3", rating: 5.0 },
  ]);

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <Container>
      <h1>Travel Destinations</h1>

      <Row>
        <Col md={4}>
          <ListGroup>
            {travelDestinations.map((destination) => (
              <ListGroup.Item
                key={destination.id}
                action
                onClick={() => handleDestinationClick(destination)}
              >
                {destination.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={8}>
          {selectedDestination && (
            <Card>
              <Card.Body>
                <Card.Title>{selectedDestination.name}</Card.Title>
                <Card.Text>
                  Average Rating: {selectedDestination.rating}
                </Card.Text>

                <Card.Title>Reviews</Card.Title>
                {reviews.map((review, index) => (
                  <div key={index}>
                    <Card.Text>{review.comment}</Card.Text>
                    <Card.Text>By: {review.user}</Card.Text>
                  </div>
                ))}

                <ReviewForm onSubmit={handleReviewSubmit} />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

function ReviewForm({ onSubmit }) {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = { comment, user };
    onSubmit(review);
    setComment("");
    setUser("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Leave a Review</h4>
      <Form.Group controlId="comment">
        <Form.Label>Comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="user">
        <Form.Label>Your Name:</Form.Label>
        <Form.Control
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ReviewPage;
