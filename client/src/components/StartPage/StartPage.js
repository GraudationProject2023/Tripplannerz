
import React, {useState, useEffect} from 'react';
import { Modal, Form, Button, FormControl } from "react-bootstrap";
import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../Image/Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Land1 from '../Image/랜딩페이지 1.png';
import Land2 from '../Image/랜딩페이지 2.png';
import Land3 from '../Image/랜딩페이지 3.png';
import Loginpage from './Kakao/Loginpage';

//hotfix

function SecondModal(props) {
  const [inputValue, setInputValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailCodeValue, setEmailCodeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordCodeValue, setPasswordCodeValue] = useState("");
  const [phonenumberValue, setPhonenumberValue] = useState("");
  const [phonenumberCodeValue, setPhonenumberCodeValue] = useState("");
  
  

  const handleInputChange = (event) => {
    if(event.target.name === "Name"){
    setInputValue(event.target.value);
    } else if(event.target.name === "Gender"){
        setGenderValue(event.target.value);


var state={
    createAuthCode : "",
    authCodeCheck: false,
};


function StartPage(){

    

    const [modalVisible, setModalVisible] = useState(false);
    const [secondmodalVisible, setSecondModalVisible] = useState(false);

    const[name, setName] = useState(""); //이름
    
    const onNamehandler = (event) => {
        setName(event.target.value);
    }

    const openModal = () => {
      
      setModalVisible(true);
      

    }
    else if(event.target.name === "Email"){
        setEmailValue(event.target.value);
    }
    else if(event.target.name === "EmailCode"){
      setEmailCodeValue(event.target.value);
    }

    else if(event.target.name === "Password"){
      setPasswordValue(event.target.value);


    const closeSecondModal = () => {

        var data ={
            name: name
        }

        axios.post('http://localhost:8080/member',data)
        .then((res) => console.log(res));

        setSecondModalVisible(false);

    }
    else if(event.target.name === "Confirmpassword"){
      setPasswordCodeValue(event.target.value);
    }
    else if(event.target.name === "Phone"){
      setPhonenumberValue(event.target.value);
    }
    else if(event.target.name === "PhoneCode"){
      setPhonenumberCodeValue(event.target.value);
    }
  };

  const handleSaveClick = () => {
    props.onSave(inputValue);
    props.onSave(genderValue);
    props.onSave(emailValue);
    props.onSave(emailCodeValue);
    props.onSave(passwordValue);
    props.onSave(passwordCodeValue);
    props.onSave(phonenumberValue);
    props.onSave(phonenumberCodeValue);

    setInputValue("");
    setGenderValue("");
    setEmailValue("");
    setEmailCodeValue("");
    setPasswordValue("");
    setPasswordCodeValue("");
    setPhonenumberValue("");
    setPhonenumberCodeValue("");
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter your name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Form.Label>Gender</Form.Label>
                <Form.Select id = "Gender" name="Gender" value={genderValue} onChange={handleInputChange}>
                <option defaultValue="(male/female)" hidden>(male/female)</option>
                <option value="male">male</option>
                <option value="female">female</option>
                </Form.Select>
                <Form.Control
              type="email"
              placeholder="Enter your email"
              value={emailValue}
              onChange={handleInputChange}
              />
              <Form.Control type="text" placeholder="Enter your Email sent Code" value={emailCodeValue} onChange={handleInputChange} />
              <Form.Control type="password" placeholder="Enter your Password" value= {passwordValue} onChange={handleInputChange} />
              <Form.Control type="password" placeholder="Confirm your Password" value={passwordCodeValue} onChange={handleInputChange} />
              <Form.Control type="text" placeholder = "Enter your Phone number" value={phonenumberValue} onChange={handleInputChange} />
              <Form.Control type="text" placeholder = "Enter your Phone sent Code" value={phonenumberCodeValue} onChange={handleInputChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function FirstModal(props) {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    
    
  
    const handleInputChange = (event) => {
      if(event.target.name === "Email"){
      setEmailValue(event.target.value);
      }
      else if(event.target.value === "Password"){
          setPasswordValue(event.target.value);
      }
    };
  
    const handleSaveClick = () => {
      props.onSave(emailValue);
      props.onSave(passwordValue);
    
      setEmailValue("");
    };
  
    return (
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={emailValue}
              onChange={handleInputChange}
            />
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={passwordValue}
              onChange={handleInputChange}
            />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            로그인하기
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

function StartPage() {
    const [showModal, setShowModal] = useState(false);
    const [firstshowModal, setFirstShowModal] = useState(false);
    const [name, setName] = useState(""); //이름
    const [gender, setGender] = useState(""); //성별
    const [email, setEmail] = useState(""); // 이메일
    const [emailcode, setEmailcode] = useState(""); //이메일 인증 코드
    const [password, setPassword] = useState(""); // 비밀번호
    const [confirmpassword, setConfirmpassword] = useState(""); // 비밀번호 확인
    const [phonenumber, setPhonenumber] = useState(""); //핸드폰번호
    const [phonenumbercode, setPhonenumbercode] = useState(""); // 핸드폰 인증 코드
    const [correct, setCorrect] = useState(false); // 비밀번호 일치 여부
    const [hyphen, setHyphen] = useState(false); //하이픈 여부 상태변수
    const [completenumber, setCompletenumber] = useState(""); //하이픈이 없는 최종 핸드폰 번호 -> axios
    const [checkemail, setCheckemail] =useState(false); //이메일 @기호 포함여부

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

    

    return(
        <>
            <ModalOverlay visible = {visible} />
            <ModalWrapper className ={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" visible={visible}>
                <ModalInner2 tabIndex ="0" className = "modal-inner">
                    {closable && <button style={{backgroundColor:"#FFFFFF",width:"30px", height:"30px", marginLeft:"500px"}} className="modal-close" onClick={close} >X</button>}
                    {children}
                </ModalInner2>
            </ModalWrapper>
        </>
    )
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

 const [email, setEmail] = useState("");
 const [AuthCode, setAuthCode] = useState("");


      const handlePhoneCodeChange = (event) => setPhonenumbercode(event.target.value);

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8080/api/members/join',{
        name: name,
        gender : gender,
        pw : password,
        email : email,
        phoneNumber : completenumber
      }).then(res => console.log(res))


      setShowModal(false);
      alert(`반갑습니다. ${name}님! 로그인을 진행해주세요`);

    const dataToSubmit = {
        email: email,
        auth: state.createAuthCode,

    };

    const handleLogin = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8080/api/members/login',{
        email: email,
        pw: password
      }).then(res => console.log(res))
      setFirstShowModal(false);
      alert(`${name}님! 로그인이 되었습니다.`);
      window.location.href="/main";
    }

  
    return (
      <div className="StartPage">
         <NavBar />
         <br />
         <img src={Land1} alt="설명페이지1" style={{width:"100%"}} />
         <img src={Land2} alt="설명페이지2" style={{width:"100%"}} />
        <img src={Land3} alt="설명페이지3" style={{width:"100%"}} />
        <div style={{marginLeft:"42%",marginTop:"5%"}}>
        <Button variant="primary" onClick={handleShow}>
          회원가입 하기
        </Button>
  
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control type="text" id="name" placeholder="Enter your Name" onChange={handleNameChange} />
            </Form>
            <Form onSubmit={handleSubmit}>
            <Form.Select
              id="Gender"
              name="Gender"
              onChange={handleGenderChange}
            >
              <option defaultValue="(male/female)" hidden>
                (male/female)
              </option>
              <option value="MALE">male</option>
              <option value="FEMALE">female</option>
            </Form.Select>
            </Form>
            <Form onSubmit={handleSubmit}>
              <Form.Control type="text" id="Email" placeholder="Enter your Email" onChange={handleEmailChange} />
            </Form>
            {checkemail === false ? '@기호를 입력해주세요' : ''}
            <Form onSubmit={handleSubmit}>
            <Form.Control type="text" id="EmailCode" placeholder="Enter your Email sent code" onChange={handleEmailCodeChange} />
            </Form>
            <Form onSubmit={handleSubmit}>
            <Form.Control type="password" id="Password" placeholder="Enter your Password" onChange={handlePasswordChange} />
            </Form>
            <Form onSubmit={handleSubmit}>
            <Form.Control type="password" id="Confirmpassword" placeholder="Confirm your Password" onChange={handleConfirmPasswordChange} />
            </Form>
            {(confirmpassword === "") ? "" :  (correct === true ? '비밀번호 일치' : '비밀번호 불일치')}
            <Form onSubmit={handleSubmit}>
            <Form.Control type="text" id="Phone" placeholder ="Enter your Phonenumber" onKeyUp={characterCheck} onKeyDown={characterCheck} onChange={handlePhoneChange} />
            </Form>
            {hyphen && (
              <div>하이픈(-)을 제거해주세요.</div>
            )}
            <Form onSubmit={handleSubmit}>
            <Form.Control type="text" id="PhoneCode" placeholder ="Enter your Phone sent code" onChange={handlePhoneCodeChange} />
            </Form>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="primary" onClick={handleFirstShow}>
          로그인하기
        </Button>
        <Modal show={firstshowModal} onHide={handleFirstClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Control type="email" placeholder ="Enter your Email" onChange={handleEmailChange}/>
                </Form>
                <Form onSubmit={handleSubmit}>
                  <Form.Control type="password" placeholder ="Enter your Password" onChange={handlePasswordChange} />
                </Form>
                <Button variant="secondary" onClick={handleFirstClose}>
              닫기
            </Button>
            <Button variant="primary" type="submit" onClick={handleLogin}>
              접속하기
            </Button>
                <hr />
                <h5>소셜 로그인</h5>
                <Loginpage />
            </Modal.Body>
            <Modal.Footer>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    );
  }
  
  export default StartPage;

    else{
        state.authCodeCheck = false;
        alert("인증코드가 일치하지 않습니다.");
    }
}

const onPhoneNumberHandler = async(phoneNumber) => {
    try{
      const response = await axios.post('/api/auth/sms', {
        phoneNumber: phoneNumber
      });
      console.log(response.data);  
    }
    catch(error){
        console.log(error);
    }
}

function movetomain(){
    window.location.href="/main";
}


function modalchange(){
    closeModal();
    localStorage.setItem("cast",1);
}

function move(){
    var member ={
        name: name
    }

    axios.post('http://localhost:8080/members',member)
    .then((res) => console.log(res));
}

   return(
    <div>
        <NavBar />
        <br />
        <img src={Land1} alt="설명페이지1" style={{width:"100%"}} />
        <img src={Land2} alt="설명페이지2" style={{width:"100%"}} />
        <img src={Land3} alt="설명페이지3" style={{width:"100%"}} />
    <div style={{marginLeft:"42%",marginTop:"5%"}}>
       {/* <img src={Logo} alt="로고" style={{width:"327px", height:"274px"}} /> */}
       <br />
       <button style={{width:"295px", height:"61px", marginLeft:"15px" ,backgroundColor:"#AA0140", color:"#FFFFFF"}} onClick={openModal}>서비스 시작하기</button>
       {
         modalVisible && <Modal
            visible={modalVisible}
            closable = {true}
            maskClosable={true}
            onClose={closeModal}
         >
            <div>
                <h4>Login</h4>
                <hr />
                <Form>
                    <div>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" id="email" placeholder="Enter your email" onChange={onEmailHandler} />
                    </div>
                    <br />
                    <div>
                       <lable>Password</lable>
                       <FormControl type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div>
                     <table>
                     <td><Button style={{marginLeft: "120px", marginTop:"100px", backgroundColor:"#FFFFFF", color:"black", width:"150px"}} onClick={movetomain} >Enter</Button>
                     </td>
                     <td>
                        <Button style={{marginLeft: "20px", marginTop:"100px", backgroundColor:"#FFFFFF", color:"black", width:"150px"}} onClick={openSecondModal} >Register</Button>
                        {
                            secondmodalVisible && <Modal
                            visible={secondmodalVisible}
                            closable={true}
                            maskClosable={true}
                            onClose={closeSecondModal}
                            >
                            <div>
                              <h4>Sign Up</h4>
                              <hr />
                              <Form>
                              <div>
                              <lable>Name</lable>
                              <Form.Control type="text" id="name" placeholder="Enter your name" onChange={onNamehandler} />
                              </div>
                              <br />
                              <div>
                              <lable>Gender</lable>
                              <Form.Select id="Gender" name ="Gender">
                              <option defaultValue="(male/female)" hidden>(male/female)</option>
                              <option value="male">male</option>
                              <option value="female">female</option>
                              </Form.Select>
                              </div>
                              <br />
                              <div>
                              <lable>Email</lable>
                             <FormControl type="email" id="email" placeholder="Enter your email" />
                             <Button>check</Button>
                             </div>
                             <br />
                             <div>
                             <lable>Code</lable>
                             <FormControl type="text" id ="code" placeholder="Enter code which you get" />
                             </div>
                            <br />
                            <div>
                            <lable>Password</lable> 
                            <FormControl type="password" id="password" placeholder="Enter your password" />  
                            </div>
                            <br />
                            <div>
                            <lable>Confirm Password</lable>
                            <FormControl type="password" id="password"  placeholder="Confirm your password" />
                            </div>
                            <br />
                            <div>
                            <lable>Phone Number</lable>
                            <FormControl type="text" id="number" placeholder="Enter your phone number" />
                            <Button>check</Button>
                            </div>
                            <br />
                            <div>
                            <lable>Code</lable>
                            <FormControl type="text" id ="code" placeholder="Enter code which you get" />
                            </div>
                            <br />
                            <br />
                            <br />
                            <div>
                            <Button style={{marginLeft:"200px" , backgroundColor:"#FFFFFF", color:"black", width:"150px"}} onClick={closeSecondModal}>Submit</Button>
                            </div>
                            <br />
                            <br />
                       </Form>
                   </div>
              </Modal>
       } 
                    </td>
                     </table>
                    </div>
                    
                </Form>
            </div>
         </Modal>
       }
       <br />
       <Loginpage />
    </div>
    <div>
      <input type="text" placeholder="Enter your Name" onChange={onNamehandler} />
      <button onClick={move}>submit</button>
    </div>
    </div>
   )
}

export default StartPage;

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 999;
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.5);
    background-color: #fff;
    border-radius: 10px;
    max-width: 600px;
    max-height: 51vh;
    ::-webkit-scrollbar{
        display:none;
    }
    overflow-y:auto;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;

const ModalInner2 = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.5);
    background-color: #fff;
    border-radius: 10px;
    max-width: 600px;
    max-height: 60vh;
    ::-webkit-scrollbar{
        display:none;
    }
    overflow-y:auto;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;
