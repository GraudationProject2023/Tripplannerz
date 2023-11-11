import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { comment } from "../../util/recoilState";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {Input} from 'antd'
import { Button, Form, Card, Modal } from "react-bootstrap";
import {Timeline} from 'antd'
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

  const [comments, setComments] = useState(["1","2"]);

  const [tripUuid, setTripUuid] = useState("");

  const [recoilComment, setRecoilComment] = useRecoilState(comment);

  const [requestAccompanyModal, setRequestAccompanyModal] = useState(false);

  const [requestContent, setRequestContent] = useState(""); // 동행 신청 내용 

  const [userName, setUserName] = useState("");

  const [searchPlace, setSearchPlace] = useState([])

  const [searchPlaceInput, setSearchPlaceInput] = useState("")

  const [searchPlaceSort, setSearchPlaceSort] = useState(false)

  useEffect(() => {
    console.log(recoilComment);

    axios.get(`http://localhost:8080/api/trip/detail/${arr[2]}`,{
      headers: {'Authorization': `Bearer ${token}`},
      withCredentials: true,
    }).then((res) => {
      setTripUuid(res.data.uuid);
      setTitle(res.data.title);
      setSearchPlaceInput(res.data.title)
      setStartingDate(res.data.startingDate);
      setComingDate(res.data.comingDate);
      setContent(res.data.content);
      setMemberNum(res.data.memberNum);
      setMemberList(res.data.memberList);
      setComments(res.data.commentList);
    });

    axios.get("http://localhost:8080/api/members/tripInfo", 
    {
     headers:{'Authorization': `Bearer ${token}` },
    }).then((response) => {
      setUserName(response.data.name)
    })

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

  const handleSearchInput = (event) => {
    setSearchPlaceInput(event.target.value)
  }

  const handleUpdateSearchInput = () => {
    setSearchPlace([...searchPlace, {children: searchPlaceInput}])
    setSearchPlaceInput("")
  }

  const timeLineItem = searchPlace.length > 0 ? searchPlace.map(item => ({
      children: item.children
  })): null


  const handleChangeTimeLineItem = () => {
      const originalOrder = [...searchPlace]
      if(originalOrder.length === 0)
      {
        alert('경로를 입력해주세요')
      }

      setSearchPlace(originalOrder.reverse())
  }

  const handleDeleteCertainComment = (index) => {
    const newComment = comments.filter((comment, idx) => idx !== index)
    setComments(newComment)

    alert('댓글이 삭제되었습니다.')

    window.location.href=`/search/${arr[2]}`    
  }
 
  return (
    <div>
      <Navbar />
        <Card>
          <Card.Body style={{display: 'flex', justifyContent:'center', alignItems: 'center' ,flexDirection: 'row'}}>
            <Kakao width="400px" height="400px" searchKeyword={searchPlaceInput} />
            <div style={{marginLeft: '20px', flex: '1'}}>
            <h3>{title}</h3>
            <h4>
              {startingDate} ~ {comingDate}
            </h4>
            <h5>내용: {content}</h5>
            <br />
            <Timeline>
            {timeLineItem && timeLineItem.map((item,index) => (
              <Timeline.Item key={index}>
                {item.children}
              </Timeline.Item>
            ))}
            </Timeline>
            <Button onClick={handleChangeTimeLineItem}>경로 최적화</Button>
            <Button onClick={handleOpenModal}>동행 신청</Button>
            </div>
            <Modal 
             show={requestAccompanyModal} 
             onHide={handleCloseModal}>
             <Modal.Header closeButton>
               <Modal.Title>동행 신청</Modal.Title>
             </Modal.Header>
             <Modal.Body>
              <Form>
                <Form.Control type="textarea" style={{height: '300px'}} placeholder="신청서를 작성해주세요" onChange={handleRequestContent}/>
                <Button onClick={handleRequestAccompany}>
                  신청하기
                </Button>
              </Form>
             </Modal.Body>
            </Modal>
            <div style={{marginLeft: '20px', flex: '2'}}>
              <h3>여행 장소</h3>
              <Input style={{width: '400px'}} placeholder="여행장소를 입력하세요" onChange={handleSearchInput} />
              <Button onClick={handleUpdateSearchInput}>입력</Button>
            </div>
          </Card.Body>
        </Card>
      <div className="CommentList">
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
        {comments.length === 0
          ? ""
          : comments.map((comment, index) => (
            <div>
              <Card key={index}>
                <p>날짜: {comment.postDate}</p>
                <p>글쓴이: {comment.senderName}</p>
                <p>댓글: {comment.review}</p>
              </Card>
              {comment.senderName === userName ? (
                <Button onClick={() => handleDeleteCertainComment(index)}>
                  삭제
                </Button>) : ""}
              </div>
            ))}
      </div>
      </div>
  );
}

export default SearchResultPage;
