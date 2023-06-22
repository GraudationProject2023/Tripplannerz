import React, {useState, useEffect} from 'react';
import { Modal, Form, Button, FormControl } from "react-bootstrap";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Land1 from '../Image/랜딩페이지 1.png';
import Land2 from '../Image/랜딩페이지 2.png';
import Land3 from '../Image/랜딩페이지 3.png';
import Loginpage from './Kakao/Loginpage';
axios.defaults.withCredentials = true;

function StartPage() {

     useEffect(() => {
                     localStorage.setItem("cast",0);
                     localStorage.setItem("rank",-1);
                     localStorage.setItem("vest",0);
                     document.cookie = 'cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;'
                },[]);

    return (
      <div className="StartPage">
         <NavBar />
         <br />
         <img src={Land1} alt="설명페이지1" style={{width:"100%"}} />
         <img src={Land2} alt="설명페이지2" style={{width:"100%"}} />
        <img src={Land3} alt="설명페이지3" style={{width:"100%"}} />
        <a href="https://www.flaticon.com/kr/free-icons/-" title="지도 및 위치 아이콘">지도 및 위치 아이콘  제작자: Freepik - Flaticon</a>
      </div>
    );
  }
  
  export default StartPage;