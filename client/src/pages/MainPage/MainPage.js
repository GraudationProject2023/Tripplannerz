import React, { useState, useEffect } from "react";
import { Card, List, Progress, FloatButton } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons'
import NavBar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { ImageSlider } from "../../util/ImageSlider";
import { TravelChart } from "../../util/TravelChart";
import KakaoMap from '../../util/KakaoMap';
import axios from "axios";
import "./MainPage.css";


function MainPage() {
  let token = localStorage.getItem("token");
  const [travelList, setTravelList] = useState([])

  const currentNumber = 0
  const order = "new"

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8080/api/trip/entireTripList`,{
        headers: {'Authorization': `Bearer ${token}`}
      })
    console.log(response.data.content)
    const updateList = response.data.content
    setTravelList(updateList)
  }
  
  useEffect(() => {
      localStorage.setItem("cast", 1);
      localStorage.setItem("rank", -1);
      localStorage.setItem("vest", 1);
      fetchData()
  },[]);

  function movetoSubPage(point) {
    window.location.href = `/search/${point}`;
  }
  
  return (
    <div>
      <NavBar />
      {token && <NavBar /> &&
        <>
          <ImageSlider />
          <br />
          {/* <TravelChart /> */}
          <List
            grid={{ gutter: 16, column: 6 }}
            dataSource={travelList}
            renderItem={(item) => (
              <List.Item>
              <Card
                onClick={(e) => movetoSubPage(item.id)}
                style={{ width: '300px', height: '400px' ,borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              >
              <h3 style={{ color: '#1890ff', marginBottom: '10px', textAlign: 'center' ,fontWeight: 'bold', fontSize: '1.5rem' }}>
                {item.title}
              </h3>
              <hr />
              <KakaoMap width="200px" height="200px"/>
              <div style={{ color: '#666', marginBottom: '10px', fontSize: '1rem' }}>
                <strong>인원 현황:</strong>
                  {item.currentNum} / {item.recruitNum}
                <br />
                <Progress percent={(item.currentNum / item.recruitNum) * 100} status="active" />
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                <strong>여행 기간:</strong> {item.startingDate} ~ {item.comingDate}
              </div>
            </Card>
            </List.Item>
          )}/>
        </>
      }
      <FloatButton
        tooltip={<div>Questions</div>}
        style={{width: '60px', height: '60px'}}
        icon={<QuestionCircleOutlined/>}
      />
      <Footer />
    </div>
  );
}

export default MainPage;
