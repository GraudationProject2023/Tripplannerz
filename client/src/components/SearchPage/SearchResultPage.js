import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import StarRating from './util/StarRating';
import Navbar from '../Navbar/Navbar';
axios.defaults.withCredentials = true;

function SearchResultPage(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('부산여행'); //제목
  const [startingDate, setStartingDate] = useState('2023-07-20'); //시작 날짜
  const [comingDate, setComingDate] = useState('2023-07-27'); //종료 날짜
  const [content, setContent] = useState('부산부산부산부산'); //내용
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
    .then(res => {
       setTitle(res.data.title);
       setStartingDate(res.data.startingDate);
       setComingDate(res.data.comingDate);
       setContent(res.data.content);
       setMemberNum(res.data.memberNum);
       setMemberList(res.data.memberList);
  });


  },[])

  return (
        <div>
          <Navbar />
           <Card style={{marginTop:"10%",marginLeft: "30%",width: "40%", height:"10%"}}>
             <Card.Body>
               <Card.Title>{title}</Card.Title>
               <Card.Subtitle>{startingDate} ~ {comingDate}</Card.Subtitle>
               <br />
               <Card.Text>내용: {content}</Card.Text>
              </Card.Body>
           </Card>

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
        </div>

  );
}

export default SearchResultPage;
