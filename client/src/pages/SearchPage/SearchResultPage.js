import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { comment } from "../../util/recoilState";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Input, Radio, Space } from 'antd'
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

  const [searchPlaceForOptimize, setSearchPlaceForOptimize] = useState([]);

  const [searchPlaceInput, setSearchPlaceInput] = useState("")

  const [optimizeModal, setOptimizeModal] = useState(false);

  useEffect(() => {
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

    // axios.get("", {
    //   headers: {'Authorization': `Bearer ${token}`},
    // }).then((response) => {

    // })

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
    const latitude = localStorage.getItem('latitude');

    const postToServer = {
      name: searchPlaceInput,
      x: latitude.split(',')[0],
      y: latitude.split(',')[1],
      tripUUID: tripUuid
    } 

    // axios.post('http://localhost:8080/api/saveLocation', postToServer, {
    //       headers: {'Authorization' : `Bearer ${token}`}
    // }).then((res) => console.log(res))

    setSearchPlace([...searchPlace, {
      name: searchPlaceInput, 
      x: latitude.split(',')[0], 
      y: latitude.split(',')[1],
      tripUUID: tripUuid
    }])
    setSearchPlaceInput("")
  }

  const timeLineItem = searchPlace.length > 0 ? searchPlace.map(item => ({
      children: item.name
  })): null
        
  const handleChangeTimeLineItem = async() => {

      const originalOrder = [...searchPlace]
      if(originalOrder.length < 2)
      {
        alert('2개 이상의 경로를 입력해주세요')
        window.location.href = `/search/${arr[2]}`
      }

      setSearchPlaceForOptimize(originalOrder);
      setOptimizeModal(true)
  }

  const handleCloseOptimizeModal = () => {
    setOptimizeModal(false);
  }

  const sendStartLocationToServer = () => {
    setOptimizeModal(false);
    window.location.href = `/search/${arr[2]}`;
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
          <Card.Body style={{display: 'flex', justifyContent:'center', alignItems: 'center' , flexDirection: 'row'}}>
            <Kakao width="400px" height="400px" searchKeyword={searchPlaceInput} />
            <div className="CardInfo" style={{ borderRadius: '10px' , border: '2px solid skyblue', maxHeight: '750px' , overflowY: 'auto', marginLeft: '20px', flex: '1'}}>
            <br />
            <h3>{title}</h3>
            <br />
            <h5>
            여행 기간 : {startingDate < comingDate ? (
              `${startingDate} ~ ${comingDate}`
            ) : (
              `${comingDate} ~ ${startingDate}`
            )}
            </h5>
            <br />
            <h5>내용: {content ? content : "예시 여행입니다."} </h5>
            <br />
            <div style={{ textAlign: 'center', minHeight: '250px', maxHeight: '250px', overflowY: 'auto', border: '4px solid skyblue', borderRadius: '10px'}}>
            <h4 style={{padding: '5px'}}><strong>TimeLine</strong></h4>
            <hr />
            <Timeline mode="alternate">
            {timeLineItem && timeLineItem.map((item,index) => (
              <Timeline.Item key={index}>
                {item.children}
              </Timeline.Item>
            ))}
            </Timeline>
            </div>
            <table>
              <td><Button style={{width: '200px', backgroundColor: 'white', color: 'black'}} onClick={handleChangeTimeLineItem}>경로 최적화</Button>
                  <Modal 
                    show={optimizeModal}
                    onHide={handleCloseOptimizeModal}
                  >
                  <Modal.Header closeButton>
                    <Modal.Title>시작점 선택</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {optimizeModal && (
                        <Radio.Group>
                      {searchPlaceForOptimize.map((searchPlace, index) => (
                          <Space direction="vertical" key={index}>
                          <Radio value={searchPlace.name}>{searchPlace.name}</Radio>
                          </Space>
                      ))}
                        </Radio.Group>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={sendStartLocationToServer}>확인</Button>
                  </Modal.Footer>
                  </Modal>
              </td>
              <td style={{padding: '75px'}}><Button style={{width: '200px', backgroundColor: 'white', color: 'black'}} onClick={handleOpenModal}>동행 신청</Button></td>
            </table>
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
            <div style={{marginTop: '-25px', marginLeft: '20px', flex: '2'}}>
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
