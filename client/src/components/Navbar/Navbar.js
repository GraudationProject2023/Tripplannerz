import React, { useState, useEffect, useRef } from "react";
import { Menu,Table,Col, Button, Input, Image, Form, Drawer, DatePicker, notification, Cascader, Upload } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import { EventSourcePolyfill} from "event-source-polyfill";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImgCrop from 'antd-img-crop'
import moment from 'moment'
import Slider from "rc-slider";

import 'rc-slider/assets/index.css'
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import { mainCategories, categories, subCategories } from "../../util/Categories";
import { moveToMain ,moveToMy, moveToBill } from "../../util/Route";
import { handleSearch, handleSearchClick } from "./search/search";
import { setEventSource } from "../../store/actions";


axios.defaults.withCredentials = true;

function NavBar() {
  let token = localStorage.getItem("token");

  const eventSourceRef = useRef(null)

  const navigate = useNavigate();

  const dispatch = useDispatch()
  
  const [searchTerm, setSearchTerm] = useState(""); //검색창
  
  const [messages, setMessages] = useState([]);
  
  const [title, setTitle] = useState("");
  
  const [memberCapacity, setMemberCapacity] = useState(0);
  
  const [date, setDate] = useState("");
  
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [name, setName] = useState(""); //프로필 이름
  
  const [gender, setGender] = useState(""); //프로필 성별
  
  const [email, setEmail] = useState(""); //프로필 이메일
  
  const [rank, setRank] = useState([]); //프로필 선호 태그
  
  const [createTravelModal,setCreateTravelModal] = useState(false);
  
  const handleCreateTravelShow = () => setCreateTravelModal(true);

  const handleCreateTravelClose = () => setCreateTravelModal(false);

  const [currentMonth, setCurrentMonth] = useState("");

  const [nextMonth, setNextMonth] = useState("");

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

  const handleCascaderChange = (value, selectedOptions) => {
    if (selectedOptions.length === 0) {
      setSelectedMainCategory("");
      setSelectedCategory("");
      setSelectedSubCategory("");
    } else {
      selectedOptions.forEach((option, index) => {
        const optionValue = option.value;
        if (index === 0) {
          handleMainCategoryChange(optionValue);
        } else if (index === 1) {
          handleCategoryChange(optionValue);
        } else if (index === 2) {
          handleSubCategoryChange(optionValue);
        }
      });
    }
  }


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

  //이미지  
  const [image, setImage] = useState([]);

  const onImageChange = ({ fileList: newFileList }) => {
    setImage(newFileList);
  };

  // const onImageInput = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setImage([
  //       {
  //         uid: '-2',
  //         name: file.name,
  //         status: 'done',
  //         url: reader.result,
  //       },
  //     ]);
  //   };

  //   reader.readAsDataURL(file);
  // };

  const onImagePreview = (file) => {
    const imgWindow = window.open(file.url);
    imgWindow?.document.write(`<img src="${file.url}" alt="Preview" />`);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if(!image|| !title || !memberCapacity || !date || !currentMonth || !nextMonth || !selectedCategory || !selectedSubCategory )
    {
      alert('모든 항목을 입력해주세요.')
    }
    else{
      
    const formData = new FormData();
    var capacity = memberCapacity / 10;
    var closeRecruitDate = date
    var goingDate = currentMonth
    var comingDate = nextMonth
    var area = selectedCategory;
    var sigungu = selectedSubCategory;

    const contentsData = {
      title,
      capacity,
      closeRecruitDate,
      goingDate,
      comingDate,
      area,
      sigungu,
    };

    console.log(image[0])
    console.log(contentsData)

    formData.append("image", image[0].originFileObj);
    formData.append(
      "contentsData",
      new Blob([JSON.stringify(contentsData)], { type: "application/json" })
    );

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
    const eventSource = eventSourceRef.current || new EventSourcePolyfill('http://localhost:8080/api/sub',{
      headers: {'Authorization': `Bearer ${token}`},
      withCredentials: true,
      heartbeatTimeout: 300000,
    })

    eventSourceRef.current = eventSource

    const handleSSE = (event) => {
      const newMessage = event.data;

      if(newMessage[0] === '{')
      {
         const jsonData = JSON.parse(newMessage);

         const senderName = jsonData.senderName;
         const review = jsonData.review;
         const postDate = jsonData.postDate;

         const notificationString = `${senderName}님이\n ${review.slice(0,4)}..를 입력하였습니다.\n ${postDate}`
         setMessages(prevMessages => [...prevMessages, notificationString])
         dispatch(setEventSource(notificationString))
      }
      
    }

    eventSource.addEventListener('SSE', handleSSE);

    if(!eventSourceRef.current){
    eventSource.onopen = () => {
      console.log('SSE connection opened.');
      notification.open({
        message: '접속이 되었습니다.'
      })
    }
    }

    eventSource.onerror = (error) => {
      console.log("SSE connection closed");
    }

    return () => {
      if(eventSourceRef.current){
        eventSource.removeEventListener('SSE', handleSSE)
      }
      eventSource.close();
    }

  }, [dispatch, token]);

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


  const [travelButton, setTravelButton] = useState(false)
  const toggleTravelButton = () => {
    setTravelButton(!travelButton)
  }

  const columnsRow1 = [
    {
      title: '1) 사진 업로드',
      dataIndex: 'imageUpload',
      width: 200, 
      render: () => (
        <>
         <ImgCrop rotationSlider>
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={image}
          onChange={onImageChange}
          onPreview={onImagePreview}
        >
          {image.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
        </>
      ),
    },
    {
      title: '2) 여행 제목',
      dataIndex: 'title',
      width: 200, 
      render: () => (
        <Form.Item label="여행 제목" name="title" style={{ display: 'flex', alignItems: 'center' }}>
          <Input style={{marginLeft: '10%', width: '200px'}} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
      ),
    },
    {
      title: '3) 모집 인원',
      dataIndex: 'capacity',
      width: 200, 
      render: () => (
        <Form.Item label={`모집 인원 ${Math.ceil(memberCapacity / 10)}명`} name="capcity">
          <Slider onChange={(e) => setMemberCapacity(e)} />
        </Form.Item>
      ),
    },
  ];

  const columnsRow2 = [
    {
      title: '4) 모집 마감 날짜',
      dataIndex: 'deadlineDate',
      width: 100,
      render: () => (
        <Form.Item label="모집 마감 날짜">
          <DatePicker onChange={(date, dateString) => setDate(dateString)} />
        </Form.Item>
      ),
    },
    {
      title: '5) 여행 시작 날짜',
      dataIndex: 'startDate',
      width: 100,
      render: () => (
        <Form.Item label="여행 시작 날짜">
          <DatePicker selected={currentMonth} onChange={(date,dateString) => handleCurrentMonthChange(dateString)} placeholderText="가는 날 선택" popperPlacement="bottom-start" />
        </Form.Item>
      ),
    },
    {
      title: '6) 여행 종료 날짜',
      dataIndex: 'endDate',
      width: 100,
      render: () => (
        <Form.Item label="여행 종료 날짜">
          <DatePicker selected={nextMonth} filterDate={disableNextMonthDates} onChange={(date,dateString) => handleNextMonthChange(dateString)} placeholderText="오는 날 선택" popperPlacement="bottom-start" />
        </Form.Item>
      ),
    },
  ];

  const data = [{}]

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
          <Button style={{width: '200px'}} onClick={toggleTravelButton}>
              여행 계획
          </Button>
        {travelButton && (
          <>
          <Menu.Item>
          <Button style={{width: '100px'}} onClick={handleCreateTravelShow}>일정생성</Button>
          <Drawer
            title= "여행 생성"
            style={{width: '100%', height: '620px', overflowY: 'auto'}}
            placement="top"
            onClose={handleCreateTravelClose}
            visible={createTravelModal}
          >
            <h5>1. 여행 장소 선택</h5>
                  <Form onFinish={handleSubmit}>
                   <Cascader options={
                    mainCategories.map(category => 
                      ({ value: category, 
                         label: category, 
                         children: categories[category].map
                                  (subCategory => 
                                  ({ value: subCategory, 
                                     label: subCategory, 
                                     children: subCategories[subCategory]?.map
                                     (city => ({ value: city, label: city })) })) }))}
                                     onChange={handleCascaderChange} 
                                     size="large"
                                     placeholder="지역을 선택하세요" />
                   </Form>
                   <hr />
                  <h5>2. 여행 정보 입력</h5>
                  <br />
                  <Form onFinish={handleSubmit}>
                    <Table
                       columns={columnsRow1}
                       dataSource={data}
                       bordered
                       pagination={false}
                       rowKey={(record, index) => index}
                    />
                    <Table
                       columns={columnsRow2}
                       dataSource={data}
                       bordered
                       pagination={false}
                       rowKey={(record,index) => index}
                    />
                  </Form>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                      등록
                    </Button>
                  </Form.Item>
          </Drawer>
        </Menu.Item>
                <Menu.Item>
                <Button style={{width: '100px'}} onClick={moveToSearch}>일정조회</Button>
              </Menu.Item>
              <Menu.Item>
                <Button style={{width: '100px'}} onClick={moveToBill}>여행경비</Button>
              </Menu.Item>
              </>
        )}
        </Menu.Item>
        <Menu.Item>
            <Input 
              style={{width: '400px', textAlign:'center'}} 
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
