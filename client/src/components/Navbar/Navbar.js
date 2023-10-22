import React, { useState, useEffect, useRef } from "react";
import DatePicker, { Calendar } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { notificationsCountState } from "../../util/recoilState";
import { token } from "../../util/recoilState";
import { eventSource } from "../../util/recoilState";
import { NativeEventSource , EventSourcePolyfill} from "event-source-polyfill";
import { Navbar, Modal, Form ,Button, Nav, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import my from "../../Image/마이페이지.png"
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Menu from "../../Image/Menu.png";
import notice from "../../Image/notice.png";
import find from "../../Image/돋보기.png";
import warn from '../../Image/warning.png'
import "./Navbar.css";
import { mainCategories, categories, subCategories } from "../../util/Categories";
import moment from 'moment'
import Slider from "rc-slider";
axios.defaults.withCredentials = true;

function NavBar() {
  let token = localStorage.getItem("token");
  
  const EventSource = EventSourcePolyfill || NativeEventSource;
  
  const [eventSourceCreate, setEventSourceCreate] = useRecoilState(eventSource);
  
  const notificationCount = useRecoilValue(notificationsCountState);
  
  const [searchTerm, setSearchTerm] = useState(""); //검색창
  
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [title, setTitle] = useState("");
  
  const [capacity, setCapacity] = useState(0);
  
  const [date, setDate] = useState("");
  
  const [going, setGoing] = useState("");
  
  const [coming, setComing] = useState("");
  
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  
  const [image, setImage] = useState([]);
  
  const [preview, setPreview] = useState([]);
  
  const [createTravelModal,setCreateTravelModal] = useState(false);
  
  const handleCreateTravelShow = () => setCreateTravelModal(true);

  const handleCreateTravelClose = () => setCreateTravelModal(false);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(moment().startOf("day"))
  );
  const [nextMonth, setNextMonth] = useState(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  );
  const handleCurrentMonthChange = (date) => {
    setCurrentMonth(date);
  };

  const handleNextMonthChange = (date) => {
    setNextMonth(date);
  };

  const disableNextMonthDates = (date) => {
    return (
      date >
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        currentMonth.getDate() - 1
      )
    );
  };

  const handleMainCategoryChange = (category) => {
    if (selectedMainCategory === category) {
      setSelectedMainCategory("");
      setSelectedCategory("");
    } else {
      setSelectedMainCategory(category);
      setSelectedCategory("");
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      setSelectedSubCategory("");
    } else {
      setSelectedCategory(category);
      setSelectedSubCategory("");
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const onChangeImageInput = (e) => {
    setImage([e.target.files[0]]);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    var closeRecruitDate = date.toString();
    var goingDate = currentMonth.toISOString().slice(0, 10);
    var comingDate = nextMonth.toISOString().slice(0, 10);
    var area = selectedCategory;
    var sigungu = selectedSubCategory;

    console.log(goingDate);
    console.log(comingDate);

    formData.append("image", image[0]);
    const contentsData = {
      title,
      capacity,
      closeRecruitDate,
      goingDate,
      comingDate,
      area,
      sigungu,
    };

    formData.append(
      "contentsData",
      new Blob([JSON.stringify(contentsData)], { type: "application/json" })
    );

    if (
      !image ||
      !title ||
      !capacity ||
      !closeRecruitDate ||
      !goingDate ||
      !comingDate ||
      !area ||
      !sigungu
    ) {
      alert("모든 항목을 입력해주세요.");
    } else {
      axios
        .post("http://localhost:8080/api/trip/create", formData, {
          headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`},
        })
        .then((response) => {
          alert("여행이 생성되었습니다!");
          console.log(response);
          console.log(formData);
          window.location.href = "/main";
        })
        .catch((response) => {
          alert("오류가 발생하였습니다.");
          console.log(response);
          console.log(formData);
        });
    }
  };

  useEffect(() => {
    const eventSource = new EventSourcePolyfill('http://localhost:8080/api/sub',{
      headers: {'Authorization': `Bearer ${token}`},
      withCredentials: true,
      heartbeatTimeout: 300000,
    })

    eventSource.addEventListener('SSE',event => {

      const newMessage = event.data;

      if(newMessage[0] === '{')
      {
         const jsonData = JSON.parse(newMessage);

         const senderName = jsonData.senderName;
         const review = jsonData.review;
         const postDate = jsonData.postDate;

         const notificationString = `${senderName}님이\n ${review.slice(0,4)}..를 입력하였습니다.\n ${postDate}`
         setMessages(prevMessages => [...prevMessages, notificationString])
        }
      else{
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    });

    eventSource.onopen =() => {
      console.log('SSE connection opened.');
      console.log('eventSource',eventSource);
    }

    eventSource.onerror = (error) => {
      console.log("SSE connection closed");
    }

    return () => {
      eventSource.close();
    }

  }, [token]);

  //알림바
  const [noticeOpen, setNoticeOpen] = useState(false);

  const toggleNotice = () => {
    setNoticeOpen(!noticeOpen);
  }

  //검색창
  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm !== "") {
      event.preventDefault();
      const url = `/search?keyword=${searchTerm}`;
      navigate(url);
    }
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    const url = `/search?keyword=${searchTerm}`;
    navigate(url);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function movetomain() {
    window.location.href = "/main";
  }

  function logout() {
    if(token !== null){

      const postToData = {
        token: token
      }

      axios
      .post("http://localhost:8080/api/members/logout", postToData, {
        headers:{
        'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res);
        alert("정상적으로 로그아웃 되었습니다.");
        localStorage.setItem("vest", 0);
        localStorage.setItem("name", "");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        alert("서버와의 연결이 끊어졌습니다.");
        localStorage.setItem("vest", 0);
        localStorage.setItem("name", "");
      });
    }
  }

  var offset = localStorage.getItem("vest");

  function movetoMy() {
    window.location.href = "/my";
  }

  //마이페이지
  const [esOpen, setesOpen] = useState(false);
  const toggleMypage = () => {
    setesOpen(!esOpen);
  };
  const closeMypage = () => {
    toggleMypage();
  };

  const moveToFind = (e) => {
    window.location.href = "/find";
  };

  const moveToSearch = (e) => {
    setSearchTerm("");
    window.location.href = `/search?keyword=${searchTerm}`;
  };

  if (offset === "1") {
    return (
        <Navbar
          expand="md"
          className="justify-content-center navbar-top"
          fixed="top"
          style={{
            borderBottom: "1px solid black",
            backgroundColor: "#FFFFFF",
            height: "13%",
          }}
        >
          <Nav className="me-auto">
            <Nav>
              <img
                src={Menu}
                onClick={movetomain}
                alt="메뉴"
                className="navbar-toggle"
                style={{ width: "300px", height: "120px", marginLeft: "3%"}}
              />
            </Nav>
            <Nav className="find">
              <img src={find} onClick={handleSearchClick} />
            </Nav>
            <Nav className="inputbox">
              <input
                type="text"
                placeholder="여행 일정을 검색하세요"
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleSearch}
              />
            </Nav>
            <Nav className="new">
              <Button className="menu-button" variant="primary" onClick={handleCreateTravelShow}>
                일정생성
              </Button>
              <Modal
                className="createTravelModal"
                show={createTravelModal}
                onHide={handleCreateTravelClose}
              >
              <Modal.Header closeButton>
                <Modal.Title>일정 생성</Modal.Title>
              </Modal.Header>
                <Modal.Body>
                  <h2>1. 여행 장소 선택</h2>
                  <Form
                   style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      height: "500px",
                      overflowY: "auto"
                   }}
                  >
                  
                  {mainCategories.map((category) => (
                    <Card 
                    className={selectedMainCategory === category ? 'placed' : ''}
                    key={category} onClick={() => handleMainCategoryChange(category)}
                    style={{
                      width: '150px',
                      height: '150px',
                      textAlign: 'center',
                      justifyContent: 'center'
                    }}
                    >
                        {category}
                    </Card>
                  ))}
                  
                  <br />
                  <br />
                  {selectedMainCategory && (
                    <div>
                      {categories[selectedMainCategory].map((category) => (
                        <Card
                          className={selectedCategory === category ? 'placed' : ''}
                          key={category}
                          style={{
                            width: '150px',
                            height: '150px',
                            textAlign: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => 
                            handleCategoryChange(category)
                          }
                          
                        >
                        {category}
                        </Card>
                      ))}
                    </div>
                  )}
                  <br />
                  <br />
                  {selectedCategory && (
                    <div>
                       {subCategories[selectedCategory].map(
                          (subCategory) => (
                            <Card
                              className = {selectedSubCategory === subCategory ? 'placed' : ''}
                              key={subCategory}
                              style={{
                                width: '150px',
                                height: '150px',
                                textAlign: 'center',
                                justifyContent: 'center'
                              }}
                              onClick={() =>
                                handleSubCategoryChange(subCategory)
                              }
                            >
                              {subCategory}
                            </Card>
                          )
                        )}
                    </div>
                  )}   
                  </Form>
                  
                  <hr />
                  <h2>2. 여행 정보 입력</h2>
                  <br />
                  <Form onSubmit ={handleSubmit}>
                  <div>
                    <Form.Group controlId="form-Image">
                      <Form.Label>사진 업로드</Form.Label>
                      <table>
                        <tr>
                          <Form.Control type="file" onChange={onChangeImageInput} />
                        </tr>
                        <tr>
                        {preview ? (
                          <img style={{width: "300px", height: "150px"}} src={preview} />
                        ):(
                          <h6>이미지 없음</h6>
                        )}
                        </tr>
                      </table>
                    </Form.Group>
                  </div>
                  <br />
                  <div>
                    <Form.Group controlId="formTitle">
                      <Form.Label>여행 제목</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => setTitle(e.target.value)} 
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <div>
                  <Form.Group controlId="formCapacity">
                    <Form.Label>모집 인원</Form.Label>
                      <Slider onChange={(e) => setCapacity(e)} />
                      {Math.ceil(capacity / 10)}명    
                  </Form.Group>
                </div>
                <br />
                  <div>
                    <Form.Group controlId="formDate">
                      <Form.Label>모집 마감 날짜</Form.Label>
                      <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>
                  </div>
                  <br />
                  <div>
                    <Form.Group controlId="formItinerary">
                      <table>
                        <td>
                          <Form.Label>여행 시작 날짜</Form.Label>
                          <DatePicker
                        selected={currentMonth}
                        onChange={handleCurrentMonthChange}
                        placeholderText="가는 날 선택"
                        popperPlacement="bottom-start"
                      />
                        </td>
                        <td>
                          <Form.Label>여행 종료 날짜</Form.Label>
                          <DatePicker
                        selected={nextMonth}
                        filterDate={disableNextMonthDates}
                        onChange={handleNextMonthChange}
                        placeholderText="오는 날 선택"
                        popperPlacement="bottom-start"
                      />
                        </td>
                      </table>
                    </Form.Group>
                  </div>
                  <Button variant="primary" type="submit">
                    등록
                  </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </Nav>
            <Nav className="search">
              <Button className="menu-button" onClick={moveToSearch}>
                일정조회
              </Button>
            </Nav>
            <Nav className="notice">
              <div className="notification-badge">
                <img src={notice} onClick={toggleNotice} />
                {noticeOpen && (
                    <>
                    <div className={`drawer${noticeOpen ? ' open' : ''}`}>
                     <ul>
                      <h2>알림: {messages.length}개</h2>
                      <hr />
                      {messages.map((text, index) => (<>
                        <li className="notification-list" key={text}>
                          <button className="btn btn-light">
                             {index % 2 === 0 ? <span className="bullet"></span> : <span className="bullet"></span>}
                                {text}
                          </button>
                        </li>
                        <br />
                        </>
                      ))}
                </ul>
             </div>
            </>)}
              </div>
            </Nav>
            <Nav className="user">
            <img src={my} onClick={toggleMypage} />
              {esOpen && (
                <ul className="mypage-content">
                  <table>
                    <br />
                    <tr>
                      <Button
                        onClick={movetoMy}
                        style={{
                          border: "1px solid white",
                          backgroundColor: "#FFFFFF",
                          color: "#000000",
                          marginTop: "-30px",
                          marginLeft: "-32px",
                          width: "150px",
                          height: "50px",
                        }}
                      >
                        {localStorage.getItem("name")}님
                      </Button>
                    </tr>
                    <hr style={{ marginLeft: "-32px", marginTop: "0px" }} />
                    <tr>
                      <Button
                        style={{
                          border: "1px solid white",
                          backgroundColor: "#FFFFFF",
                          color: "#000000",
                          marginTop: "-15.6px",
                          marginLeft: "-32px",
                          width: "150px",
                          height: "50px",
                        }}
                        onClick={logout}
                      >
                        로그아웃
                      </Button>
                    </tr>
                  </table>
                </ul>
              )}
            </Nav>
          </Nav>
        </Navbar>
    );
  }
}

export default NavBar;
