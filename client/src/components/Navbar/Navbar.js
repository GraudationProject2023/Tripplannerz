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
import "./Navbar.css";
import IconWithTooltip from "../../util/IconWithTooltip";
import {notification} from 'antd';
axios.defaults.withCredentials = true;

const NotificationBadge = ({ count }) => {
  const renderNotificationBadge = () => {
    return (
      <div className="notification-badge">
        <IconWithTooltip iconSrc={notice} />
        {count > 0 && <div className="badge">{count}</div>}
      </div>
    );
  };

  return renderNotificationBadge();
};

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
    })

    eventSource.addEventListener('SSE',event => {
      console.log("event",event);

      const newMessage = event.data;

      console.log('newMessage : ', event.data);
      setMessages(prevMessages => [...prevMessages, newMessage]);

      notification.info({
        message: 'New Notification',
        description: newMessage,
        style:{
          backgroundColor: '#EEEEEE'
        }
      });
    });

    eventSource.onopen =() => {
      console.log('SSE connection opened.');
      console.log('eventSource',eventSource);
    }

    eventSource.onmessage = (event) => {
      try{
        console.log('SSE message received: ', event.data);
        const newMessage = event.data;
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
      catch(error){
        console.log("Error in onmessage: ", error);
      }
    }

    eventSource.onerror = (error) => {
      console.log("SSE connection closed");
    }

    return () => {
      eventSource.close();
    }

  }, [token]);

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
    axios
      .get("http://localhost:8080/api/members/logout",{
        headers:{
                      'Authorization': `Bearer ${token}`
                  }
      })
      .then((res) => {
        console.log(res);
        alert("정상적으로 로그아웃 되었습니다.");
        localStorage.setItem("vest", 0);
        localStorage.setItem("name", "");
      })
      .catch((error) => {
        console.log(error);
        alert("서버와의 연결이 끊어졌습니다.");
        localStorage.setItem("vest", 0);
        localStorage.setItem("name", "");
      });

    window.location.href = "/";
  }

  var offset = localStorage.getItem("vest");

  function movetoMy() {
    window.location.href = "/my";
  }

  //메뉴바
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("");
  const navbarLinksRef = useRef(null);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const closeNavbar = () => {
    setIsOpen(false);
  };

  const handleListClick = (list) => {
    setSelectedList(list);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarLinksRef.current &&
        !navbarLinksRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarLinksRef]);

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

  const moveToNotice = (e) => {
    window.location.href = "/notice";
  };

  if (offset === "1") {
    return (
      <div className="navbar">
        <Navbar
          expand="md"
          className="justify-content-center navbar-top"
          fixed="top"
          style={{
            border: "1px solid #FFFFFF",
            backgroundColor: "#EEEEEE",
            height: "15%",
          }}
        >
          <Nav className="me-auto">
            <Nav>
              <img
                src={Menu}
                onClick={movetomain}
                alt="메뉴"
                className="navbar-toggle"
                style={{ width: "200px", height: "50px", marginTop: "0%" }}
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
            <Nav className="notice" onClick={moveToNotice}>
              <NotificationBadge count={notificationCount} />
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
            <Nav className="chat">
              <img src={chat} alt="채팅" />
            </Nav>
          </Nav>
        </Navbar>
        <hr />
      </div>
    );
  }
}

export default NavBar;
