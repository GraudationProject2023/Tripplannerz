import React from 'react';
import User from '../Image/User.png';
import New from '../Image/New.png';
import My from '../Image/My.png';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function MainPage(){
   return(
    <div>
    <NavBar />
    <div style={{marginLeft: "40%", marginTop:"10%"}}>
        <div class ="card-horizontal" style={{border:"1px solid"}}>
            <div class="img-square-wrapper">
                <img src={New} style={{width:"100px", height:"100px"}} alt="새 일정 생성" />
            </div>
            <div class ="card-body">
                <h2 class="card-title">새 일정 생성</h2>
                <p class="card-text">
                    새로운 일정을 생성하세요.
                </p>
            </div>
        </div>
        <br />
        <div class ="card-horizontal">
            <div class="img-square-wrapper">
                <img src={User} style={{width:"100px", height:"100px"}} alt="동행자 찾기" />
            </div>
            <div class ="card-body">
                <h2 class="card-title">동행자 찾기</h2>
                <p class="card-text">
                    본인이 계획한 여행 일정의 동행자를 찾거나, 다른 사람들의 여행 일정에 참가하세요.
                </p>
            </div>
        </div>
        <br />
        <div class ="card-horizontal">
            <div class="img-square-wrapper">
                <img src={My} style={{width:"100px", height:"100px"}} alt="내 일정 보기" />
            </div>
            <div class ="card-body">
                <h2 class="card-title">내 여행 일정</h2>
                <p class="card-text">
                    본인의 여행 일정을 확인하세요.
                </p>
            </div>
        </div>
    </div>
    <Footer />
    </div>
   )
}

export default MainPage;