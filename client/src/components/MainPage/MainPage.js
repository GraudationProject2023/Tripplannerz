import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./MainPage.css";
import img from "../Image/카카오톡.png";
import main1 from "../Image/main.jpg";
import main2 from "../Image/main2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainSlider() {
  const settings = {
    infinite: true,
    slickarrow: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    dots: false,
  };
  return (
    <div className="image-slider">
      <Slider {...settings}>
        <div>
          <img alt="img1" className="main-slider-img" src={main1} />
        </div>
        <div>
          <img alt="img2" className="main-slider-img" src={main2} />
        </div>
      </Slider>
    </div>
  );
}

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
        <div>
          <MainSlider />
      <br />
      <br />
      <div className="mainPageTitle">
        <h2>동행할 여행 목록</h2>
      </div>
      <br />
      <hr />
      <div className="ShowList">
        {console.log(travelList)}
       {travelList.length === 0 ? 'null' : travelList.map((item, idx) => {
         <Card key={item.id}>
          {item.title}
         </Card>
       })}
      </div>
      <br />
      <br />
      <hr />
      <Footer />
     </div>
     }
    </div>
  );
}

export default MainPage;
