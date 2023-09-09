import React from "react";
import NavBar from '../Navbar/Navbar';
import './NoticePage.css';
import warn from '../Image/warning.png';
import {eventSource} from '../../util/recoilState';

function NoticePage() {
  return(
    <div>
      {console.log(eventSource)}
      <NavBar />
      <div className="null-warn">
        <img style={{width: '100px', height: '100px'}} alt="알림없음" src={warn} />
        <br />
        <br />
        <h2>수신된 알림이 없습니다.</h2>
      </div>
    </div>
  )
}

export default NoticePage;