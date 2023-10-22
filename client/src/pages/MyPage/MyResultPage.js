import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import StarRating from "../../util/StarRating"

axios.defaults.withCredentials = true;

function SearchResultPage(props) {
  let token = localStorage.getItem("token");
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `/api/members/trip/result?id=${postId}`,
          {
            withCredentials: true,
          }
        );
        const postData = response.data;
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Row>
            <Col>
              <h2>Trip Details</h2>
              <Card>
                <Card.Body>
                  <Card.Title>Starting Date: {post.startingDate}</Card.Title>
                  <Card.Text>Duration: {post.period}</Card.Text>
                  <Card.Text>Content: {post.content}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Reviews</h2>
              <Form.Group>
                <Form.Label>Add a Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={review}
                  onChange={handleReviewChange}
                />
              </Form.Group>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
              <Button variant="primary">Submit Review</Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default SearchResultPage;
