import React, { useState, useEffect } from "react";
import { 
  Menu,
  Table,
  Col, 
  Button, 
  Input, 
  Upload ,
  Form, 
  Card, 
  Drawer,
  DatePicker,
  notification
} from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import { NativeEventSource , EventSourcePolyfill} from "event-source-polyfill";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from 'moment'
import Slider from "rc-slider";

import 'rc-slider/assets/index.css'
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import { notificationsCountState } from "../../util/recoilState";
import { token } from "../../util/recoilState";
import { eventSource } from "../../util/recoilState";
import { mainCategories, categories, subCategories } from "../../util/Categories";
import { moveToMain ,moveToMy, moveToBill } from "../../util/Route";
import { handleSearch, handleSearchClick } from "./search/search";

import find from "../../Image/돋보기.png";


axios.defaults.withCredentials = true;

function NavBar() {
  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  
  const EventSource = EventSourcePolyfill || NativeEventSource;
  
  const [eventSourceCreate, setEventSourceCreate] = useRecoilState(eventSource);
  
  const notificationCount = useRecoilValue(notificationsCountState);
  
  const [searchTerm, setSearchTerm] = useState(""); //검색창
  
  const [messages, setMessages] = useState([]);
  
  const [title, setTitle] = useState("");
  
  const [memberCapacity, setMemberCapacity] = useState(0);
  
  const [date, setDate] = useState("");
  
  const [going, setGoing] = useState("");
  
  const [coming, setComing] = useState("");
  
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  
  const [image, setImage] = useState([]);
  
  const [preview, setPreview] = useState([]);

  const [name, setName] = useState(""); //프로필 이름
  
  const [gender, setGender] = useState(""); //프로필 성별
  
  const [email, setEmail] = useState(""); //프로필 이메일
  
  const [rank, setRank] = useState([]); //프로필 선호 태그
  
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
    var capacity = memberCapacity / 10;
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

  function Logout() {
    if(token !== null)
    {
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
      notification.open({
        message: '접속이 되었습니다.'
      })
    }

    eventSource.onerror = (error) => {
      console.log("SSE connection closed");
    }

    return () => {
      eventSource.close();
    }

  }, [token]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/members/tripInfo", 
     {
      headers:{'Authorization': `Bearer ${token}` },
     }).then((response) => {
      setName(response.data.name);
      setGender(response.data.gender);
      setEmail(response.data.email);
      setRank(response.data.preferences);
    });
  },[])

  const moveToMain = () => {
    window.location.href = '/main'
  }


  //알림바
  const [noticeOpen, setNoticeOpen] = useState(false);

  const handleOpenNotice = () => {
    setNoticeOpen(true)
  }
  
  const handleCloseNotice = () => {
    setNoticeOpen(false)
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  var offset = localStorage.getItem("vest");

  //마이페이지
  const [esOpen, setEsOpen] = useState(false);
  const openMyPage = () => {
    setEsOpen(true)
  }
  const closeMypage = () => {
    setEsOpen(false)
  };

  const moveToSearch = (e) => {
    setSearchTerm("");
    window.location.href = `/search?keyword=${searchTerm}`;
  };

  if (offset === "1") {
    return (
      <Menu 
        mode="horizontal"
        theme="light" 
        style={{
          backgroundColor: '#EEEEEE',
          height: '100px',
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Menu.Item>
          <Button style={{width: '200px'}} onClick={moveToMain}>TripPlannerz</Button>
        </Menu.Item>
        <Menu.Item>
          <Button style={{width: '200px'}} onClick={handleCreateTravelShow}>일정생성</Button>
          <Drawer
            title= "여행 생성"
            style={{width: '100%', height: '620px', overflowY: 'auto'}}
            placement="top"
            onClose={handleCreateTravelClose}
            visible={createTravelModal}
          >
            <h5>1. 여행 장소 선택</h5>
                  <Form
                    style={{
                      border: "1px solid black",
                       borderRadius: "10px",
                       height: "500px",
                       overflowY: "auto",
                    }}
                   >
                   {mainCategories.map((category) => (
                     <Card 
                     className={selectedMainCategory === category ? 'placed' : ''}
                     key={category} onClick={() => handleMainCategoryChange(category)}
                     style={{ width: '150px',
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
                  <h5>2. 여행 정보 입력</h5>
                  <br />
                  <Form>
                  <table>
                    <h6>1) 사진 업로드</h6>
                      <tr>
                        <Upload 
                            onChange={onChangeImageInput}
                            showUploadList={false}   
                        />
                        </tr>
                        <tr>
                        {preview ? (
                          <img style={{width: "300px", height: "150px"}} src={preview} />
                        ):(
                          <h6>이미지 없음</h6>
                        )}
                        </tr>
                  </table>
                  <br />
                  <Form.Item label="2) 여행 제목" name="title">
                      <Input onChange={(e) => setTitle(e.target.value)} />
                  </Form.Item>
                  <Form.Item label={`3) 모집 인원 ${Math.ceil(memberCapacity / 10)}명`} name="capcity">
                    <Slider onChange={(e) => setMemberCapacity(e)} />
                  </Form.Item>
                  <table>
                    <td>
                      <Form.Item label="4) 모집 마감 날짜">
                      <DatePicker onChange = {(date, dateString) => setDate(dateString)} />
                      </Form.Item>
                    </td>
                    <td style={{padding: '10px'}}>
                    <Form.Item label="5) 여행 시작 날짜">
                    <DatePicker
                        selected={currentMonth}
                        onChange={handleCurrentMonthChange}
                        placeholderText="가는 날 선택"
                        popperPlacement="bottom-start"
                      />
                    </Form.Item>
                    </td>
                    <td style={{padding: '10px'}}>
                    <Form.Item label="6) 여행 종료 날짜">
                      <DatePicker
                        selected={nextMonth}
                        filterDate={disableNextMonthDates}
                        onChange={handleNextMonthChange}
                        placeholderText="오는 날 선택"
                        popperPlacement="bottom-start"
                      />
                    </Form.Item>
                    </td>
                  </table>
                  <Button variant="primary" type="submit">
                    등록
                  </Button>
                  </Form> 
          </Drawer>
        </Menu.Item>
        <Menu.Item>
          <Button style={{width: '200px'}} onClick={moveToSearch}>일정조회</Button>
        </Menu.Item>
        <Menu.Item>
          <Button style={{width: '200px'}} onClick={moveToBill}>여행경비</Button>
        </Menu.Item>
        <Menu.Item>
            <Input 
              style={{width: '600px', textAlign:'center'}} 
              value={searchTerm} 
              placeholder="여행 일정을 검색하세요"
              onChange={handleChange}
              onKeyPress={(event) => 
              handleSearch(navigate, event, searchTerm)}
             />
        </Menu.Item>
        <Menu.Item>
            <BellOutlined 
              style={{width: '100px', justifyContent: 'center'}}  
              onClick={handleOpenNotice}
            /> 
            <Drawer
             title="알림"
             onClose={handleCloseNotice}
             visible={noticeOpen}
            >
            <h5>알림: {messages.length}개</h5>
            <hr />
            {messages.map((text, index) => (<>
              <li key={text}>
                <Button>
                  {text}
                </Button>
              </li>
              <br />
              </>
            ))}
            </Drawer>
        </Menu.Item>
        <Menu.Item>
          <UserOutlined style={{width: '100px', justifyContent: 'center'}} onClick={openMyPage} />
          <Drawer
            title="사용자 정보"
            onClose={closeMypage}
            visible={esOpen}
          >
            <Table dataSource={[{ name, gender, email, rank}]}>
            <Col title="이름" dataIndex="name" key="name" />
            <Col title="성별" dataIndex="gender" key="gender" render={(text) => (text ? text : '없음')} />
            <Col title="이메일" dataIndex="email" key="email" />
            <Col title="선호도" dataIndex="rank" key="rank" />
            </Table>
          <hr />
          <Button
            style={{
              width: '330px',
              borderColor: 'black'
            }}
            onClick={moveToMy}
          >
          마이페이지
          </Button>
          <br />
          <br />
          <Button
            onClick={Logout}
            style={{
              width: '330px',
              borderColor: 'black'
            }}
          >
            로그아웃
          </Button>
          </Drawer>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
