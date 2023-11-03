import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import NavBar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { ImageSlider } from "../../util/ImageSlider";
import axios from "axios";
import "./MainPage.css";


function MainPage() {
  let token = localStorage.getItem("token");
  const [travelList, setTravelList] = useState([])

  const currentNumber = 0
  const order = "new"

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8080/api/trip/tripList?page=${currentNumber}&sortType=${order}&keyWord=`,{
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
          <List
            grid={{ gutter: 16, column: 6 }}
            dataSource={travelList}
            renderItem={(item) => (
              <List.Item>
              <Card
                onClick={(e) => movetoSubPage(item.id)}
                style={{ width: '300px' }}
              >
              <h4 style={{ color: '#333', marginBottom: '10px' }}>제목: {item.title}</h4>
              <div style={{ color: '#666', marginBottom: '5px' }}>
              <strong>인원 현황:</strong> {item.currentNum} / {item.recruitNum}
              <br />
              <strong>여행 기간:</strong> {item.startingDate} ~ {item.comingDate}
              </div>
            </Card>
            </List.Item>
          )}/>
        </>
      }
      <Footer />
    </div>
  );
}

export default MainPage;
