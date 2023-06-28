import React, { useState, useEffect } from 'react';
import {Form,Button,Modal} from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import './MyPage.css'
import Menu from '../Image/Menu.png';
import notice from '../Image/notice.png';
import sight from '../Image/관광지.png';
import culture from '../Image/문화시설.png';
import festival from '../Image/축제.png';
import surfing from '../Image/서핑.png';
import hotel from '../Image/호텔.png';
import shopping from '../Image/쇼핑.png';
import restaurant from '../Image/레스토랑.png';
import axios from 'axios';
axios.default.withCredentials=true;



function MyPage(){
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [rank, setRank] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState('profile'); //메뉴 토글
  const [preview, setPreview] = useState([]);
  const [create, setCreate] = useState(0); //생성한 일정 개수
  const [password, setPassword] = useState('') // 수정할 패스워드
  const [confirmpassword, setConfirmpassword] = useState(""); //수정할 패스워드 확인
  const [correct, setCorrect] = useState(false); // 비밀번호 일치 여부

  const handlePassword = (e) => {
     setPassword(e.target.value);
  }
  const handleConfirmPasswordChange = (event) =>
      {
        const CONFIRMPASSWORD = event.target.value;
        if(confirmpassword !== password.slice(0,-1))
        {
          console.log("error")
          setCorrect(false);
        }
        else{
          console.log("success")
          setCorrect(true);
        }
        setConfirmpassword(CONFIRMPASSWORD);
      }

  var ranklist = "";

   useEffect(() => {
                      localStorage.setItem("cast",1);
                      localStorage.setItem("rank",-1);
                      localStorage.setItem("vest",1);
                      document.cookie = 'cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;'
                      axios.get('http://localhost:8080/api/members/tripInfo')
                      .then((response) => {
                        setName(response.data.name);
                        setGender(response.data.gender);
                        setEmail(response.data.email);
                        setRank(response.data.preferences);
                      })

    },[]);

    for(let i = 0; i<rank.length-1; i++)
    {
        ranklist += rank[i];
        ranklist += ", ";
    }
    ranklist += rank[rank.length-1];


  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  const Button1 = () => {
              const arr = [{id: 1, name: "관광지", code: "SIGHTSEEING",image: sight }, {id: 2, name: "문화시설", code:"CULTURE",image: culture}, { id: 3, name: "축제 • 공연",code:"FESTIVAL" ,image: festival },{id : 4, name: "레포츠",code:"LEISURE" ,image: surfing},{id : 5, name:"호캉스",code:"VACATION",image: hotel},{id: 6, name:"쇼핑",code:"SHOPPING",image: shopping},{id: 7,code:"RESTAURANT",name:"맛집탐방",image: restaurant}];

              const [pick1, setPick1] = useState(arr);
              const [select1, setSelect1] = useState([]);
              const [ranking, setRanking] = useState([]);
              const [show, setShow] = useState([]);


              const handleButtonClick = (itemId) => {
                  if(select1.includes(itemId)){
                    setSelect1(select1.filter((button) => button !== itemId));
                  }
                  else if(select1.length < 3){
                      setSelect1((select1) => [...select1, itemId]);
                  }
              }

               const setRankingText = () => {
                              const rankingText = [];
                              const rankingShow = [];
                              for(let i = 0; i < select1.length; i++)
                              {
                                  const button = pick1.find((item) => item.id === select1[i]);
                                  rankingShow.push(`${i+1}순위`);
                                  rankingText.push(`${button.code}`);

                              }
                              setShow(rankingShow);
                              setRanking(rankingText);
                              if(rankingText.length === 0)
                              {
                                  localStorage.setItem("rank",-1);
                              }
                              else{
                              localStorage.setItem("rank",rankingText);
                              }
                          };

              useEffect(() => {
                  setRankingText();

              },[select1]);


              return (
              <div>
                   <div>
                        {pick1.map((item) => (
                          <div
                            key={item.id}
                            className={
                              select1.includes(item.id)
                                ? "button_table_btn_ns"
                                : "button_table_btn_s"
                            }
                            onClick={() => handleButtonClick(item.id)}
                          >
                            <img style={{width:"50px",height:"50px",marginTop:"5px"}} src={item.image} alt={item.name} className="card_image" />
                            <div style={{marginTop:"5px",fontSize:"18px"}} className="card_text">{item.name}</div>
                            {select1.includes(item.id) && (
                              <div className="rank_text">
                                {show[select1.indexOf(item.id)]}
                              </div>
                            )}
                          </div>
                        ))}

                      </div>


                      </div>
              )
  };
  //모달들
  const [nestedModal, setNestedModal] = useState(false);
  const handleCloseNested = () => {
              var res = localStorage.getItem("rank");
              if(res === "-1")
              {
                  alert("태그를 최소 1개 이상 선택하셔야 합니다.");
              }
              else{
                setNestedModal(false);
              }
      }

  const handleNestedModal = () => {


                setNestedModal(true);

  }

  const[withdrawlModal, setWithdrawlModal] = useState(false);
  const handleWithdrawlModal = () => {
        setWithdrawlModal(true);
  }
  const handleCloseWithdrawl = () => {
        setWithdrawlModal(false);
  }

   const renderProfilePage = () => {
      return(
          <div className = "profile-card">
             <h2>마이 페이지</h2>
                <h5>이름 : {name}</h5>
                <h5>성별 : {gender} </h5>
                <h5>이메일 : {email}</h5>
                <h5>선호태그 : {ranklist} </h5>
          </div>
      );
    }

  const renderAccountPage = () => {

    return(
        <div className = "profile-card">
           <h2>정보 수정</h2>
           <Form>
           <Form.Group controlId = "Password">
           <table>
           <td>
           <Form.Label>비밀번호</Form.Label>
           </td>
           <td style={{padding:"20px"}}>
           <Form.Control style={{width: "150px"}} type="text" onChange={handlePassword} />
           </td>
           </table>
           </Form.Group>
           <Form.Group controlId = "Password">
           <table>
           <td>
           <Form.Label>비밀번호 확인</Form.Label>
           </td>
           <td style={{padding:"20px"}}>
           <Form.Control style={{width: "150px"}} type="text" onChange={handleConfirmPasswordChange}/>
           </td>
           </table>
           </Form.Group>
           {(confirmpassword === "") ? "" :  (correct === true ? '비밀번호 일치' : '비밀번호 불일치')}
           <Button style={{width: "200px"}} onClick={handleNestedModal}>태그 변경</Button>
           {nestedModal && (<Modal show={handleNestedModal} onHide={handleCloseNested}>
                                                 <Modal.Header closeButton>
                                                   <Modal.Title>태그</Modal.Title>
                                                   <Modal.Body>변경 전 태그는 {ranklist} 입니다. </Modal.Body>
                                                 </Modal.Header>
                                                 <Modal.Body>
                                                   <Button1 />
                                                 </Modal.Body>
                                                 <Modal.Footer>
                                                  <Button variant="primary" type="submit" onClick={handleCloseNested}>
                                                       확인
                                                  </Button>
                                                 </Modal.Footer>
                                                 </Modal>
           )}
           <Button style={{width:"100px"}} variant="primary" type="submit">
           변경하기
           </Button>
           </Form>
        </div>
    );
  }

  const renderWithdrawlPage = () => {
      return(
          <div className = "profile-card">
             <h2>회원 탈퇴</h2>
             <h5>회원 탈퇴 시 개인정보 및 TripPlannerz에서 만들어진 모든 데이터들이 삭제됩니다.</h5>
             <Button onClick={handleWithdrawlModal}>탈퇴하기</Button>
             {withdrawlModal && (<Modal show={handleWithdrawlModal} onHide={handleCloseWithdrawl}>
                   <Modal.Header closeButton>
                      <Modal.Title>비밀번호 입력</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input type="text" placeholder="비밀번호 입력" />
                      </Modal.Body>
                      <Modal.Footer>
                      <Button variant="primary" type="submit" onClick={handleCloseWithdrawl}>
                           탈퇴하기
                      </Button>
                     </Modal.Footer>
                   </Modal>
             )}
          </div>
      );
    }

  let currentPageComponent;
  if(currentPage === 'profile'){
    currentPageComponent = renderProfilePage();
  }
  else if(currentPage === 'account'){
    currentPageComponent = renderAccountPage();
  }
  else if(currentPage === 'withdrawl'){
    currentPageComponent = renderWithdrawlPage();
  }

  return (
    <div>
     <Navbar />
     <div className = "table_n">
     <table>
     <td>
        <div className="content">
              {currentPageComponent}
        </div>
     </td>
     <td>
     <div className = "container">
      <div className = "profile-card">
        <button className={`buttonstyle ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => handlePageChange('profile')}>프로필</button>
        <hr />
        <button className={`buttonstyle ${currentPage === 'account' ? 'active' : ''}`} onClick={() => handlePageChange('account')}>정보 수정</button>
        <hr />
        <button className={`buttonstyle ${currentPage === 'schedule' ? 'active' : ''}`} onClick={() => handlePageChange('withdrawl')}>회원 탈퇴</button>
       </div>
      </div>
      </td>
      </table>
      </div>
    </div>
  );
};

export default MyPage;
