import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { notificationsCountState } from "../../util/recoilState";
import { token } from "../../util/recoilState";
import { eventSource } from "../../util/recoilState";
import { NativeEventSource , EventSourcePolyfill} from "event-source-polyfill";
import { Navbar, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image from "../Image/마이페이지.png";
import chat from "../Image/chat.png";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Menu from "../Image/Menu.png";
import notice from "../Image/notice.png";
import find from "../Image/돋보기.png";
import warn from '../Image/warning.png';
import "./Navbar.css";
axios.defaults.withCredentials = true;

function NavBar() {
  let token = localStorage.getItem("token");
  
  const EventSource = EventSourcePolyfill || NativeEventSource;
  
  const [eventSourceCreate, setEventSourceCreate] = useRecoilState(eventSource);
  
  const notificationCount = useRecoilValue(notificationsCountState);
  
  const [searchTerm, setSearchTerm] = useState(""); //검색창
  
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);

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
              <Button className="menu-button" onClick={moveToFind}>
                일정생성
              </Button>
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
              <img src={image} onClick={toggleMypage} />
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
