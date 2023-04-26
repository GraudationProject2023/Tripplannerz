import React, {useState, useEffect} from 'react';
import { Modal, Form, Button, FormControl } from "react-bootstrap";
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
//hotfix add
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
    }
    else if(event.target.name === "Email"){
        setEmailValue(event.target.value);
    }
    else if(event.target.name === "EmailCode"){
      setEmailCodeValue(event.target.value);
    }
    else if(event.target.name === "Password"){
      setPasswordValue(event.target.value);
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
      axios.post('http://localhost:8080/api/members/join',{
        name: name,
        gender : gender,
        pw : password,
        email : email,
        phoneNumber : completenumber
      }).then(res => console.log(res))

      setShowModal(false);
      alert(`반갑습니다. ${name}님! 로그인을 진행해주세요`);
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

    const EmailSend = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8080/api/members/emailConfirm',{
        email: email
      }).then(res => console.log(res))
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
            <Button onClick={EmailSend}>전송</Button>
            <Form onSubmit={handleSubmit}>
            <Form.Control type="text" id="EmailCode" placeholder="Enter your Email sent code" onChange={handleEmailCodeChange} />
            </Form>
            <Button>확인</Button>
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