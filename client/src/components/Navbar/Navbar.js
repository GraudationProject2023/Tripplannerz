import React ,{useState, useEffect, useRef} from 'react';
import {Modal ,Navbar, Button , FormControl, Form, Container, Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import image from '../Image/마이페이지.png';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Loginpage from '../StartPage/Kakao/Loginpage';
import CountdownTimer from '../../util/CountdownTimer';
import Menu from '../Image/Menu.png';
import notice from '../Image/notice.png';
import sight from '../Image/관광지.png';
import culture from '../Image/문화시설.png';
import festival from '../Image/축제.png';
import surfing from '../Image/서핑.png';
import hotel from '../Image/호텔.png';
import shopping from '../Image/쇼핑.png';
import restaurant from '../Image/레스토랑.png';
import './Navbar.css';
axios.defaults.withCredentials = true;

function NavBar(){

    const [showModal, setShowModal] = useState(false);
    const [firstshowModal, setFirstShowModal] = useState(false);
    const [name, setName] = useState(""); //이름
    const [gender, setGender] = useState(""); //성별
    const [email, setEmail] = useState(""); // 이메일
    const [emailCode, setEmailcode] = useState("000000"); //이메일 인증 코드
    const [password, setPassword] = useState(""); // 비밀번호
    const [confirmpassword, setConfirmpassword] = useState(""); // 비밀번호 확인
    const [phonenumber, setPhonenumber] = useState(""); //핸드폰번호
    const [phonenumbercode, setPhonenumbercode] = useState(""); // 핸드폰 인증 코드
    const [correct, setCorrect] = useState(false); // 비밀번호 일치 여부
    const [hyphen, setHyphen] = useState(false); //하이픈 여부 상태변수
    const [completenumber, setCompletenumber] = useState(""); //하이픈이 없는 최종 핸드폰 번호 -> axios
    const [checkemail, setCheckemail] =useState(false); //이메일 @기호 포함여부
    const [emailSuccess , setEmailSuccess] = useState(false);
    const [loginSuccess , setLoginSuccess] = useState(false);
    const [emailtimer, setEmailTimer] = useState(false);

    //다중 모달
    const [nestedModal, setNestedModal] = useState(false);
    const handleCloseNested = () => setNestedModal(false);
    const showNestedModal = () => setNestedModal(true);
    const handleNestedModal = () => setNestedModal(true);


    useEffect(() => {
         localStorage.setItem("cast",0);
         document.cookie = 'cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;'
    },[]);
    const Button1 = () => {
            const arr = [{id: 1, name: "관광지",image: sight }, {id: 2, name: "문화시설", image: culture}, { id: 3, name: "축제 • 공연", image: festival },{id : 4, name: "레포츠", image: surfing},{id : 5, name:"호캉스",image: hotel},{id: 6, name:"쇼핑",image: shopping},{id: 7,name:"맛집탐방",image: restaurant}];
            const [pick1, setPick1] = useState(arr);
            const [select1, setSelect1] = useState([]);

            const handleButtonClick = (itemId) => {
                if(select1.includes(itemId)){
                  setSelect1(select1.filter((button) => button !== itemId));
                }
                else if(select1.length < 3){
                    setSelect1((select1) => [...select1, itemId]);
                }
            }

            return (
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
                        </div>
                      ))}
                    </div>
            )
          };

function movetomain()
{
    window.location.href="/main";
}

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleFirstClose = () => setFirstShowModal(false);
    const handleFirstShow = () => setFirstShowModal(true);
    const handleNameChange = (event) => setName(event.target.value);
    const handleGenderChange = (event) => setGender(event.target.value);
    const handleEmailChange = (event) =>
      {
        const e = event.target.value;
        if(e.indexOf('@') === -1){
          event.target.setCustomValidity('@기호를 입력해주세요');
          setCheckemail(false);
        }
        else{
          event.target.setCustomValidity('');
          setCheckemail(true);
        }
        setEmail(event.target.value);
      }
    const handleEmailCodeChange = (event) => setEmailcode(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
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

    const characterCheck = (event) => {
      var regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/gi;
      if(event.target.value !== undefined && regExp.test(event.target.value)){
        event.target.value = event.target.value.substring(0, event.target.value.length-1);
      }
    }

    const handlePhoneChange = (event) => {
      var newNumber = event.target.value;
      const NoHyphen = newNumber.replace(/-/g, '');

      if(newNumber.includes("-"))
      {
        setPhonenumber(newNumber.replace(/-/g,''));
        setHyphen(true);
        return;
      }
      if(newNumber.length > phonenumber.length){
        setHyphen(true);
      } else {
        setHyphen(false);
      }

      if(/^\d{10,11}$/.test(NoHyphen)){
        setCompletenumber(NoHyphen);
        setHyphen(false);
        setPhonenumber(newNumber);
      } else {
        setPhonenumber(phonenumber);
        setHyphen(false);
      }
    };

    // useEffect(() => {
    //   setHyphen(completenumber.length < phonenumber.length);
    // },[completenumber,phonenumber]);

      const handlePhoneCodeChange = (event) => setPhonenumbercode(event.target.value);

    const handleSubmit = (event) => {
      event.preventDefault();
      var cas = localStorage.getItem("cast");

      if(!name || !gender || !password || !email)
      {
          alert('모든 항목을 입력하셔야 합니다.')
      }
      else {
      if(cas === '1'){
      axios.post('http://localhost:8080/api/members/join',{
        name: name,
        gender : gender,
        pw : password,
        email : email,
        phoneNumber : completenumber
      }).then(res => console.log(res))
      alert(`반갑습니다. ${name}님! 로그인을 진행해주세요`);
      setShowModal(false);
    }

    else if(cas === '0') {
      alert('이메일 인증을 먼저 진행해주세요.');
    }
    }
}


    const handleLogin = (event) => {
      event.preventDefault();

      const emailValue = email;
      const passwordValue = password;


      axios.post('http://localhost:8080/api/members/login',{
        email: email,
        pw: password
      }).then(res => {
         console.log(res);
         var rlt = res.data.result;
         var na = res.data.name;
         if(rlt === true)
         {
            localStorage.setItem("vest",1);
         }
         else {
            localStorage.setItem("vest",0);
         }

         var set = localStorage.getItem("vest");

         if(set === '1')
         {
             alert(`${na}님! 로그인이 되었습니다.`);
             setFirstShowModal(false);
             window.location.href="/main";
         }
         else if(set === '0') {
             alert('로그인이 실패하였습니다. 다시 입력해주세요')
         }
      }).catch(error => {
        console.error(error.response);
      })

    }

    const EmailSend = (event) => {
      event.preventDefault();
      if(checkemail === true){
      axios.post('http://localhost:8080/api/members/emailConfirm',{
        email: email
      }).then(res => console.log(res))
      .catch(error => {
        console.error(error.response);
      })

      setEmailTimer(true);
    }
    else if(checkemail === false){
      alert('이메일 형식이 틀렸습니다. @기호를 사용하셔야 합니다.')
    }
    }

    var requestword ="";

    const EmailCheck = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8080/api/members/emailConfirmCode',{
            emailConfirmCode: emailCode,
            email: email
    },{
        'Content-Type':'application/json'
    })
      .then(response => { console.log(response);
        requestword = response.data.result;
        if(requestword === true)
        {
          setEmailSuccess(true);
          localStorage.setItem("cast",1);
          alert('이메일 인증 성공');
          setEmailTimer(false);
        }
        else {
          localStorage.setItem("cast",0);
          alert('이메일 인증 코드 틀림');
          setEmailTimer(false);
        }
      })
      .catch(error => {
        console.error(error.response);
      })
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

    var successEmail = localStorage.getItem("cast");
    var offset = localStorage.getItem("vest");

    function LogoutMain(){
      window.location.href="/main";
    }

    const onButtonClick = () => {
      console.log('이메일 전송 완료');
    };

    //메뉴바
    const [isOpen, setIsOpen] = useState(false);
    const [selectedList, setSelectedList] = useState("");
    const navbarLinksRef = useRef(null);
    const toggleNavbar = () => {
       setIsOpen(!isOpen);
    };
    const closeNavbar = () => {
       setIsOpen(false);
    }

    const handleListClick = (list) => {
          setSelectedList(list);
    };

    useEffect(() => {
     const handleClickOutside = (event) => {
       if(navbarLinksRef.current && !navbarLinksRef.current.contains(event.target)){
          setIsOpen(false);
       }
     };
     document.addEventListener('mousedown', handleClickOutside);
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };

    }, [navbarLinksRef]);

    //마이페이지
    const [esOpen, setesOpen] = useState(false);
    const toggleMypage = () => {
        setesOpen(!esOpen);
    }
    const closeMypage = () => {
        toggleMypage();
    }

    if(offset === '0'){
    return(
        <div className ="navbar">
        <Navbar expand="md" className="justify-content-center navbar-top" fixed="top" style={{border:"1px solid #FFFFFF",backgroundColor:"#EEEEEE",height:"15%"}} >
            <Nav className="me-auto">
                <Nav style={{marginTop:"1%"}}>
                   <img src={Menu} alt="메뉴" className="navbar-toggle" style={{width:"200px",height:"50px", marginTop:"0%"}} />
                </Nav>
                <Nav style={{marginLeft:"650%", marginTop:"1%"}}>
                <Button variant="primary" onClick={handleFirstShow}style={{backgroundColor:"#FFFFFF",color:"#000000",width:"100px",height:"37px"}}>
                  로그인
                </Button>
                <Modal show={firstshowModal} onHide={handleFirstClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Control type="email" onEnterPress={handleLogin} placeholder ="이메일을 입력해주세요" onChange={handleEmailChange}/>
                  <Form.Control type="password" onEnterPress={handleLogin} placeholder ="비밀번호를 입력해주세요" onChange={handlePasswordChange} />
                    <Button variant="secondary" onClick={handleFirstClose}>
                                 닫기
                    </Button>
                   <Button variant="primary" type="submit" onClick={handleLogin}>
                                 접속하기
                   </Button>
                </Form>

                <Form onSubmit={handleSubmit}>

                </Form>


                <hr />
                <h5>소셜 로그인</h5>
                <Loginpage />
            </Modal.Body>
            <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor:"#FFFFFF",color:"#000000",width:"100px",height:"37px"}}>
          회원가입
        </Button>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control type="text" id="name" placeholder="이름을 입력해주세요" onChange={handleNameChange} />
            </Form>
            <Form onSubmit={handleSubmit}>
            <Form.Select
              id="Gender"
              name="Gender"
              onChange={handleGenderChange}
            >
              <option defaultValue="(male/female)" hidden>
                (남/여)
              </option>
              <option value="MALE">남</option>
              <option value="FEMALE">여</option>
            </Form.Select>
            </Form>
            <Form onSubmit={handleSubmit}>
              <Form.Control type="text" id="Email" placeholder="이메일을 입력해주세요" onChange={handleEmailChange} />
            </Form>
            {successEmail !== '1' ? <div>
            <Button onClick={EmailSend}>전송</Button>
            {emailtimer ? <CountdownTimer onButtonClick={onButtonClick}/> : ""}
            <Form onSubmit={handleSubmit}>
            <Form.Control type="text" id="EmailCode" placeholder="이메일 인증 코드를 입력해주세요" onChange={handleEmailCodeChange} />
            </Form>
            <Button onClick={EmailCheck}>확인</Button>
            </div> : ""}
            <Form onSubmit={handleSubmit}>
            <Form.Control type="password" id="Password" placeholder="비밀번호를 입력해주세요" onChange={handlePasswordChange} />
            </Form>
            <Form onSubmit={handleSubmit}>
            <Form.Control type="password" id="Confirmpassword" placeholder="비밀번호를 확인하세요" onChange={handleConfirmPasswordChange} />
            </Form>
            {(confirmpassword === "") ? "" :  (correct === true ? '비밀번호 일치' : '비밀번호 불일치')}

          </Modal.Body>
          <Modal.Footer>
            <Button style={{marginLeft:"-10px"}} variant="secondary" onClick={handleNestedModal}>
              다음
            </Button>
            {

                <Modal show={nestedModal} onHide={handleCloseNested}>
                          <Modal.Header closeButton>
                            <Modal.Title>태그</Modal.Title>
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

            }
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal>

             </Nav>
          </Nav>
        </Navbar>
        </div>
    )
    }
    else if(offset === '1')
    {

      return(
      <div className ="navbar">
       <Navbar expand="md" className="justify-content-center navbar-top" fixed="top" style={{border:"1px solid #FFFFFF",backgroundColor:"whitesmoke",height:"15%"}} >
                <Nav className="me-auto">
                        <Nav>
                           <img src={Menu} onClick={movetomain} alt="메뉴" className="navbar-toggle" style={{width:"200px",height:"50px", marginTop:"0%"}} />
                        </Nav>
                        <Nav className = "inputbox">
                          <input type="text" placeholder="동행을 찾아보세요" />
                        </Nav>
                        <Nav className = "new">
                            <a href="/schedule" class="button">일정생성</a>
                        </Nav>
                        <Nav className = "search">
                            <a href="/search" class="button">일정조회</a>
                        </Nav>
                        <Nav className = "notice">
                          <img src={notice}/>
                        </Nav>
                        <Nav className ="user">
                            <img src={image} onClick={toggleMypage} />
                             {esOpen && (
                                   <ul className="mypage-content">
                                      <table>
                                      <br />
                                      <tr><Button style={{border:"1px solid white",backgroundColor:"#FFFFFF",color:"#000000",marginTop: "-30px",marginLeft: "-32px",width:"150px",height:"50px"}}>${name}님</Button></tr>
                                      <hr style={{marginLeft:"-32px",marginTop:"0px"}} />
                                      <tr>
                                        <Button style={{border:"1px solid white",backgroundColor:"#FFFFFF",color:"#000000",marginTop:"-15.6px",marginLeft: "-32px",width:"150px",height:"50px"}} onClick={logout}>로그아웃</Button>
                                      </tr>
                                      </table>
                                   </ul>
                             )}
                        </Nav>

                    </Nav>

        </Navbar>
        <hr />
        </div>
      )
    }
}

export default NavBar;

