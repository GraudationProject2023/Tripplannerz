import React from 'react';
import User from '../Image/User.png';
import New from '../Image/New.png';
import My from '../Image/My.png';

function MainPage(){
   return(
    <div>
        <div class ="card-horizontal">
            <div class="img-square-wrapper">
                <img src={New} style={{width:"100px", height:"100px"}} alt="새 일정 생성" />
            </div>
            <div class ="card-body">
                <h2 class="card-title">New Schedule</h2>
                <p class="card-text">
                    Create your new travel schedule
                </p>
            </div>
        </div>
        <div class ="card-horizontal">
            <div class="img-square-wrapper">
                <img src={User} style={{width:"100px", height:"100px"}} alt="동행자 찾기" />
            </div>
            <div class ="card-body">
                <h2 class="card-title">Find Companion</h2>
                <p class="card-text">
                    Find companion for your travel or Join to other's travel
                </p>
            </div>
        </div>
        <div class ="card-horizontal">
            <div class="img-square-wrapper">
                <img src={My} style={{width:"100px", height:"100px"}} alt="내 일정 보기" />
            </div>
            <div class ="card-body">
                <h2 class="card-title">My Schedule</h2>
                <p class="card-text">
                    Confirm your travel schedule
                </p>
            </div>
        </div>
    </div>
   )
}

export default MainPage;