import React, { useState, useEffect } from "react";
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
function MainPage() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    localStorage.setItem("cast", 1);
    localStorage.setItem("rank", -1);
    localStorage.setItem("vest", 1);
    document.cookie =
      "cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

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

  function logout() {
    axios
      .get("http://localhost:8080/api/members/logout")
      .then((res) => {
        console.log(res);
        alert("정상적으로 로그아웃 되었습니다.");
        localStorage.setItem("vest", 0);
      })
      .catch((error) => {
        console.log(error);
        alert("서버와의 연결이 끊어졌습니다.");
        localStorage.setItem("vest", 0);
      });

    window.location.href = "/";
  }

  useEffect(() => {
    localStorage.setItem("vest", 1);
  }, []);

  function movetoSchedule() {
    window.location.href = "/schedule";
  }

  function movetoMySchedule() {
    window.location.href = "/search";
  }

  function movetoSubPage() {
    window.location.href = `/search/${num}`;
  }

  const items = [];
  for (let i = 0; i < 2; i++) {
    items.push(
      <div className="List">
        <div className="container-fluid">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card" onClick={movetoSubPage}>
                <table>
                  <td>
                    <div className="img-square-wrapper">
                      <img src={img} alt="사진" />
                    </div>
                  </td>
                  <td>
                    <div class="card-body">
                      <h2 class="card-title">여행</h2>
                      <p class="card-text">
                        <h4>부산</h4>
                        <br />
                        <h5>#해운대 #광안리</h5>
                      </p>
                    </div>
                  </td>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <MainSlider />
      <br />
      <br />
      <div className="mainPageTitle">
        <h2>여행 일정을 확인하고 동행해보세요!</h2>
      </div>
      <br />
      <hr />
      <div className="ShowList">
        <table>
          <td>{items}</td>
          <td>{items}</td>
          <td>{items}</td>
          <td>{items}</td>
        </table>
      </div>
      <br />
      <br />
      <hr />
      <Footer />
    </div>
  );
}

export default MainPage;
