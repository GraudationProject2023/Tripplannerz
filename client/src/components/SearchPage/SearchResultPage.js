import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import StarRating from './util/StarRating';
axios.defaults.withCredentials = true;

function SearchResultPage(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState(''); //제목
  const [startingDate, setStartingDate] = useState(''); //시작 날짜
  const [comingDate, setComingDate] = useState(''); //종료 날짜
  const [content, setContent] = useState(''); //내용
  const [memberNum, setMemberNum] = useState(0); //멤버 수
  const [memberList,setMemberList] = useState([]); //멤버 인원

  const arr = location.pathname.split("/");

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/trip/detail/${arr[2]}`)
    .then((res) => console.log(res));


  },[])

  return (

        <div>
          <Row>
            <Col>
              <h2>Trip Details</h2>
              <Card>
                <Card.Body>
                  <Card.Title>Starting Date: {startingDate}</Card.Title>
                  <Card.Text>Duration: {startingDate}</Card.Text>
                  <Card.Text>Content: {content}</Card.Text>
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
        </div>

  );
}

export default SearchResultPage;
