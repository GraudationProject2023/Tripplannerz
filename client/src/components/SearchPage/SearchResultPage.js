import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { comment } from "../../util/recoilState";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import StarRating from "./util/StarRating";
import Navbar from "../Navbar/Navbar";
import Kakao from "../../util/KakaoMap";
axios.defaults.withCredentials = true;

function SearchResultPage(props) {
  
  let token = localStorage.getItem("token");
  
  const location = useLocation();
  
  const arr = location.pathname.split("/");
  
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState(""); //제목
  
  const [startingDate, setStartingDate] = useState(""); //시작 날짜
  
  const [comingDate, setComingDate] = useState(""); //종료 날짜
  
  const [content, setContent] = useState(""); //내용
  
  const [memberNum, setMemberNum] = useState(0); //멤버 수
  
  const [memberList, setMemberList] = useState([]); //멤버 인원

  const [review, setReview] = useState("");//댓글의 실제 내용

  const [comments, setComments] = useState([]);

  const [tripUuid, setTripUuid] = useState("");

  const [recoilComment, setRecoilComment] = useRecoilState(comment);

  useEffect(() => {
    console.log(recoilComment);

    axios.get(`http://localhost:8080/api/trip/detail/${arr[2]}`,{
      headers: {'Authorization': `Bearer ${token}`},
      withCredentials: true,
    }).then((res) => {
      setTripUuid(res.data.uuid);
      setTitle(res.data.title);
      setStartingDate(res.data.startingDate);
      setComingDate(res.data.comingDate);
      setContent(res.data.content);
      setMemberNum(res.data.memberNum);
      setMemberList(res.data.memberList);
      setComments(res.data.commentList);
    });
  }, []);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  }

  const handleAddComment = () => {
    if(review){

      setRecoilComment(review);
      console.log(recoilComment);

      const postToServer = {
        review: review,
        tripUUID: tripUuid,
      }

      axios.post(`http://localhost:8080/api/trip/postComment`,postToServer,{
       headers: {'Authorization': `Bearer ${token}`}
     }).then((res) => {
      alert("댓글이 등록되었습니다.")
      window.location.href=`/search/${arr[2]}`
     }).catch((res) => alert('댓글 등록에 오류가 발생하였습니다.'))
    }
  };

  function keyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddComment();
      setReview("");
    }
  }

 
  return (
    <div>
      <Navbar />
      <Kakao />
      <div className="content">
        <Card style={{ width: "400px", height: "400px" }}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>
              {startingDate} ~ {comingDate}
            </Card.Subtitle>
            <br />
            <Card.Text>내용: {content}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="profile">
        <Card style={{ width: "300px", height: "200px" }}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>
              {startingDate} ~ {comingDate}
            </Card.Subtitle>
            <br />
            <Card.Text>내용: {content}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="review">
        <Card style={{ width: "800px", height: "200px" }}>
          <Card.Body>
            <Card.Title>댓글</Card.Title>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={handleReviewChange}
                style={{ width: "700px" }}
                onKeyDown={keyDown}
              />
            </Form.Group>
            <Button
              style={{ marginLeft: "80%", marginTop: "-10%" }}
              variant="primary"
              onClick={handleAddComment}
            >
              댓글 추가
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="comments">
        {comments.length === 0
          ? ""
          : comments.map((comment, index) => (
              <Card style={{ width: "800px" }} key={index}>
                <p>날짜: {comment.postDate}</p>
                <p>글쓴이: {comment.senderName}</p>
                <p>댓글: {comment.review}</p>
              </Card>
            ))}
      </div>
    </div>
  );
}

export default SearchResultPage;
