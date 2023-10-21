import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
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
        <div className = "mainPageContext">
          <ImageSlider />
      <br />
      <br />
      <div className="mainPageTitle">
        <h2>동행할 여행 목록</h2>
      </div>
      <br />
      <hr />
      <div className="ShowList">
      {travelList.map((item) => (
         <Card
          style={{
            display: 'inline-block',
            width: '20%',
            height: '200px',
            margin: '0 30px',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'transform 0.3s ease-in-out',
          }}
          key={item.id}
          onClick={(e) => movetoSubPage(item.id)}
          >
        <h4 style={{ marginBottom: '10px', color: '#333' }}>제목: {item.title}</h4>
        <div style={{ marginBottom: '10px', color: '#666' }}>
          <strong>인원 현황:</strong> {item.currentNum} / {item.recruitNum}
        </div>
        <div style={{ color: '#666' }}>
          <strong>여행 기간:</strong> {item.startingDate} ~ {item.comingDate}
        </div>
        </Card>
      ))}

      </div>
      <hr />
      <Footer />
     </div>
     }
    </div>
  );
}

export default MainPage;
