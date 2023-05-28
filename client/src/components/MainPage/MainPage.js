import React,{useState,useEffect} from 'react';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './MainPage.css';
import img from '../Image/카카오톡.png';
import main1 from '../Image/MP_1.png';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function MainPage(){


   function MainSlider(){
        const settings = {
             infinite: true,
             slickarrow: true,
             speed: 500,
             slideToShow: 1,
             slideToScroll: 1,
             autoplay: true,
             autoplaySpeed: 1000,
             dots: false

        };
        return(
            <div className = "image-slider">
               <Slider {...settings}>
                <div>
                   <img alt="img1" src={main1} />
                </div>
                <div>
                   <img alt="img2" src={main1} />
                </div>
               </Slider>
            </div>
        )
   }


   function logout(){
      axios.get('http://localhost:8080/api/members/logout')
      .then(res=> {
      console.log(res);
      alert('정상적으로 로그아웃 되었습니다.');
      localStorage.setItem("vest",0);
      })
      .catch(error=>{
      console.log(error);
      alert('서버와의 연결이 끊어졌습니다.');
      localStorage.setItem("vest",0);
      })

      window.location.href="/";
   }

   useEffect(() => {
     localStorage.setItem("vest",1);
   },[])

   function movetoSchedule(){
    window.location.href="/schedule";
   }

   function movetoMySchedule(){
    window.location.href="/search";
   }

    const items = [];
    for(let i = 0; i < 2; i++)
    {
        items.push(
             <div className="List">
                   <div className="container-fluid">
                      <div class="row">
                         <div class="col-12 mt-3">
                            <div class="card-horizontal">
                               <table>
                               <td><div className="img-square-wrapper">
                                   <img src={img} alt="사진" />
                               </div></td>
                               <td><div class="card-body">
                                  <h2 class="card-title">여행</h2>
                                  <p class="card-text">
                                    <h4>부산</h4>
                                    <br />
                                    <h5>#해운대 #광안리</h5>
                                  </p>
                               </div></td>
                               </table>
                         </div>

                      </div>
                   </div>
                 </div>
                </div>
        )
    }

   return(
    <div>
    <NavBar />

    <MainSlider />

    {/*<div style={{marginLeft: "55%", marginTop:"-25%"}}>
        <div class ="card-horizontal" onClick={movetoSchedule} style={{backgroundColor:"white",border:"1px solid white", width:"650px", borderRadius:"10px"}}>
            <div class="img-square-wrapper">

            </div>
            <div class ="card-body">
                <h2 class="card-title">새 일정 생성</h2>
                <p class="card-text">
                    새로운 일정을 생성하세요.
                </p>
            </div>
        </div>
        <br />
        <div class ="card-horizontal" style={{backgroundColor:"white",border: "1px solid", width:"650px", borderRadius:"10px"}}>
            <div class="img-square-wrapper">

            </div>
            <div class ="card-body">
                <h2 class="card-title">동행자 찾기</h2>
                <p class="card-text">
                    본인이 계획한 여행 일정의 동행자를 찾거나, 다른 사람들의 여행 일정에 참가하세요.
                </p>
            </div>
        </div>
        <br />
        <div class ="card-horizontal" onClick={movetoMySchedule} style={{backgroundColor:"white",border: "1px solid", width:"650px", borderRadius:"10px"}}>
            <div class="img-square-wrapper">

            </div>
            <div class ="card-body">
                <h2 class="card-title">내 여행 일정</h2>
                <p class="card-text">
                    본인의 여행 일정을 확인하세요.
                </p>
            </div>
        </div>
    </div>*/}
    <br />
    <br />
    <div className="Title">
      <h2>여행에 동참하세요!</h2>
    </div>
    <br />
    <div className ="ShowList">
      <table>
      <td>
      {items}
      </td>
      <td>
      {items}
      </td>
      <td>
        {items}
      </td>
      <td>
        {items}
      </td>
      </table>
    </div>

    </div>
   )
}

export default MainPage;