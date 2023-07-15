import React, {useState, useEffect, useRef} from 'react';
import { Modal, Form, Button, FormControl } from "react-bootstrap";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import StartNavBar from '../Navbar/StartNavbar';
import Footer from '../Footer/Footer';
import Land1 from '../Image/랜딩페이지 1.png';
import Land2 from '../Image/랜딩페이지 2.png';
import Land3 from '../Image/랜딩페이지 3.png';
import Loginpage from './Kakao/Loginpage';
import './StartPage.css';
axios.defaults.withCredentials = true;

function StartPage() {
     const videoRef = useRef(null);

     useEffect(() => {
        localStorage.setItem("cast",0);
        localStorage.setItem("rank",-1);
        localStorage.setItem("vest",0);

        const handleScroll = () => {
            const video = videoRef.current;

            const {top, bottom} = video.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if(top <= windowHeight && bottom >= 0){
                video.play();
            } else {
                video.pause();
            }

        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }

     },[]);

    return (
      <div className="StartPage">
         <StartNavBar />
         <br />
         <div style={{position: 'relative'}}>
         <video className="video" ref = {videoRef} src="https://drive.google.com/uc?export=download&id=1lDhpyyyWknwmeMIGsVypMNdrU_4g_w56" autoPlay muted loop />
          <div style={{position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h1>TripPlannerz</h1>
            <h3>여행 종합 서비스</h3>
          </div>
         </div>
         <img src={Land2} alt="설명페이지2" style={{width:"100%"}} />
         <h6>비디오 제작 : Veed.io</h6>
         <a href="https://www.flaticon.com/kr/free-icons/-" title="지도 및 위치 아이콘">지도 및 위치 아이콘  제작자: Freepik - Flaticon</a>
      </div>
    );
  }
  
  export default StartPage;