import React,{useEffect} from 'react';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import Background from '../Image/랜딩페이지 4.png';
import './MainPage.css';
import img from '../Image/카카오톡.png';
function MainPage(){

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
    for(let i = 0; i < 5; i++)
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
    <img src={Background} alt="배경" style={{width:"100%", height:"300px",zindex:"-1"}} />
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
    <div>
      {items}
    </div>

    </div>
   )
}

export default MainPage;