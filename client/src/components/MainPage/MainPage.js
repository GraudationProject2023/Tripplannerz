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
  let token = localStorage.getItem("token");
  useEffect(() => {
    localStorage.setItem("cast", 1);
    localStorage.setItem("rank", -1);
    localStorage.setItem("vest", 1);
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


  useEffect(() => {
    localStorage.setItem("vest", 1);
  }, []);

  function movetoSubPage(point) {
    window.location.href = `/search/${point}`;
  }

  const items = [];

  for (let i = 0; i < 2; i++) {
    const rowId = `${i}`;
    const cards = [];

    for (let j = 0; j < 4; j++) {
      const cardId = `${i + j}`;
      cards.push(
        <td key={cardId}>
          <div className="List">
            <div className="container-fluid">
              <div class="row">
                <div class="col-12 mt-3">
                  <div class="card" onClick={(e) => movetoSubPage(cardId)}>
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
        </td>
      );
    }

    items.push(<td key={rowId}>{cards}</td>);
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
          <tr>{items}</tr>
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
