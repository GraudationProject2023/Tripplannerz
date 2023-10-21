import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { comment } from "../../util/recoilState";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button, Form, Card, Modal } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar"
import Kakao from "../../util/KakaoMap";
import "./SearchResultPage.css"
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

  const [requestAccompanyModal, setRequestAccompanyModal] = useState(false);

  const [requestContent, setRequestContent] = useState(""); // 동행 신청 내용 

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

  const handleOpenModal = () => {
    setRequestAccompanyModal(true);
  }

  const handleCloseModal = () => {
    setRequestAccompanyModal(false);
  }

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

  const handleRequestContent = (event) => {
    setRequestContent(event.target.value);
  }

  const handleRequestAccompany = () => {
    const postToServer = {
      review: requestContent,
      tripUUID: tripUuid
    }

    axios.post(`http://localhost:8080/api/trip/requestAccompany`, postToServer, {
      headers: {'Authorization': `Bearer ${token}`}
    }).then((res) => {
      alert("동행 신청이 완료되었습니다.")
    }).catch((res) => alert('동행 신청에 오류가 발생하였습니다.'))
  }

 
  return (
    <div>
      <Navbar />
      <Kakao />
      <div className="ResultContent">
        <Card style={{
          width: "500px",
          height: "400px"
        }}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>
              {startingDate} ~ {comingDate}
            </Card.Subtitle>
            <br />
            <Card.Text>내용: {content}</Card.Text>
            <Button onClick={handleOpenModal}>동행 신청</Button>
            <Modal style={{width: '600px', height: '600px'}} 
             show={requestAccompanyModal} 
             onHide={handleCloseModal}>
             <Modal.Header closeButton>
               <Modal.Title>동행 신청</Modal.Title>
             </Modal.Header>
             <Modal.Body>
              <Form>
                <Form.Control type="textarea" style={{height: '300px'}} placeholder="신청서를 작성해주세요" onChange={handleRequestContent}/>
                <Button variant="primary" type="submit" onClick={handleRequestAccompany}>
                  신청하기
                </Button>
              </Form>
             </Modal.Body>
            </Modal>
          </Card.Body>
        </Card>
      </div>
      <div className="ResultComment">
        <Card style={{
          width: "905px",
          height: "200px"
        }}>
          <Card.Body>
            <Card.Title>댓글</Card.Title>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={handleReviewChange}
                onKeyDown={keyDown}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleAddComment}
            >
              댓글 추가
            </Button>
          </Card.Body>
        </Card>
      </div>
      <div className="CommentList">
        {comments.length === 0
          ? ""
          : comments.map((comment, index) => (
              <Card style={{
                width: "600px",
                height: "120px"
              }} key={index}>
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
