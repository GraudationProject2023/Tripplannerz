import React from 'react';

function MainPage(){
   return(
    <div>
        <div class ="card-horizontal">
            <div class="img-square-wrapper">
                <img alt="새 일정 생성" />
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
                <img alt="동행자 찾기" />
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
                <img alt="내 일정 보기" />
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