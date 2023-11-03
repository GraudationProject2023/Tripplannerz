import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import NavBar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { ImageSlider } from "../../util/ImageSlider";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import 'slick-carousel/slick/slick-theme.css'
import axios from "axios";
import CustomArrow from "../../components/Arrow/Arrow";
import "./MainPage.css";


const StyledSlider = styled(Slider)`
    .slick-slide div{
      width: 100%;
      height: 200px;
      outline: none;
    }
`;


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

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction = "next" />,
    prevArrow: <CustomArrow direction = "prev" />,
    speed: 500
  }

  return (
    <div>
      <NavBar />
      {token && <NavBar /> &&
        <>
          <ImageSlider />
          <StyledSlider {...settings}>
      {travelList.map((item) => (
         <Card
          key={item.id}
          onClick={(e) => movetoSubPage(item.id)}
          >
          <h4 style={{ color: '#333', marginBottom: '10px' }}>제목: {item.title}</h4>
          <div style={{ color: '#666', marginBottom: '5px' }}>
            <strong>인원 현황:</strong> {item.currentNum} / {item.recruitNum}
            <br />
            <strong>여행 기간:</strong> {item.startingDate} ~ {item.comingDate}
          </div>
        </Card>
        ))}
        </StyledSlider>
        </>
      }
      <Footer />
    </div>
  );
}

export default MainPage;
