import React, { useRef, useEffect, useState } from 'react';
import CountdownTimer from "../../util/CountdownTimer";
import { eventSource } from "../../util/recoilState";
import { SelectPreference } from '../../util/SelectPreference';
import {StyledAboutContainer, StyledAboutImage, AboutTitle, AboutContent, AboutButton } from '../../style/StyleComponent'
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import sight from '../../Image/관광지.png'
import './StartAnimationPage.css'
import {Modal, Form, Button} from 'react-bootstrap'
axios.defaults.withCredentials = true;

const onButtonClick = () => {
  console.log("이메일 전송 완료");
};

function StartAnimation() {
  const element = useRef(null);
  
  const [eventSourceCreate, setEventSourceCreate] = useRecoilState(eventSource);
  
  const [inViewPort, setInViewPort] = useState(false);
  
  const [showSecondContainer, setShowSecondContainer] = useState(false); 
  
  const [showModal, setShowModal] = useState(false);
  
  const [firstShowModal, setFirstShowModal] = useState(false);

  const [passwordModal, setPasswordModal] = useState(false);
  
  const [name, setName] = useState("1"); //이름
  
  const [gender, setGender] = useState(""); //성별
  
  const [email, setEmail] = useState(""); // 이메일
  
  const [emailCode, setEmailCode] = useState("000000"); //이메일 인증 코드
  
  const [password, setPassword] = useState(""); // 비밀번호
  
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  
  const [correct, setCorrect] = useState(false); // 비밀번호 일치 여부
  
  const [checkEmail, setCheckEmail] = useState(false); //이메일 @기호 포함여부
  
  const [emailSuccess, setEmailSuccess] = useState(false);
  
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const [emailTimer, setEmailTimer] = useState(false);
  
  const [nestedModal, setNestedModal] = useState(false);

  let successEmail = localStorage.getItem("cast");
  let requestWord = "";

  const handleFirstShow = () => setFirstShowModal(true);

  const handleFirstClose = () => setFirstShowModal(false);

  const handleShow = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  const handleNestedModal = () => {
    setNestedModal(true);
  };

  const handleCloseNested = () => {
    var res = localStorage.getItem("rank");
    if (res === "-1") {
      alert("태그를 최소 1개 이상 선택하셔야 합니다.");
    } else {
      setNestedModal(false);
    }
  };

  const handlePasswordModalOpen = () => {
    setPasswordModal(true)
  }

  const handlePasswordModalClose = () => {
    setPasswordModal(false)
  }

  const handleNameChange = (event) => setName(event.target.value);
  
  const handleGenderChange = (event) => setGender(event.target.value);
  
  const handleEmailChange = (event) => {
    const e = event.target.value;
    if (e.indexOf("@") === -1) {
      event.target.setCustomValidity("@기호를 입력해주세요");
      setCheckEmail(false);
    } else {
      event.target.setCustomValidity("");
      setCheckEmail(true);
    }
    setEmail(event.target.value);
  };

  const handleEmailCodeChange = (event) => setEmailCode(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) => {
    const CONFIRMPASSWORD = event.target.value;
    if (confirmPassword !== password.slice(0, -1)) {
      console.log("error");
      setCorrect(false);
    } else {
      console.log("success");
      setCorrect(true);
    }
    setConfirmPassword(CONFIRMPASSWORD);
  };

  const EmailSend = (event) => {
    event.preventDefault();
    if (checkEmail === true) {
      axios
        .post("/api/members/emailConfirm", {
          email: email,
        })
        .then((res) => console.log(res))
        .catch((error) => {
          console.error(error.response);
        });

      setEmailTimer(true);
    } else if (checkEmail === false) {
      alert("이메일 형식이 틀렸습니다. @기호를 사용하셔야 합니다.");
    }
  };

  const EmailCheck = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/members/emailConfirmCode",
        {
          emailConfirmCode: emailCode,
          email: email,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        console.log(response);
        requestWord = response.data.result;
        if (requestWord === true) {
          setEmailSuccess(true);
          localStorage.setItem("cast", 1);
          alert("이메일 인증 성공");
          setEmailTimer(false);
        } else {
          localStorage.setItem("cast", 0);
          alert("이메일 인증 코드 틀림");
          setEmailTimer(false);
        }
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  const handleJWTLogin = (event) => {
    event.preventDefault();
    const credentialDto = {
      email: email,
      pw: password,
    };
    axios.post(
        "/api/members/loginJWT",
        credentialDto
      ).then((res) => 
      {
        const token = res.data.token
        if(token !== null){
        localStorage.setItem("token", token);

        let tempEvent = new EventSourcePolyfill("/api/sub", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
        })

        console.log(tempEvent)

        tempEvent.onopen = (e) =>{
          console.log('알림성공')
        } 

        tempEvent.onmessage = function(e) {
          const data = e.data;
          console.log(data)
        }

        localStorage.setItem("name",name);
        alert("반갑습니다! 로그인이 되었습니다.");
        window.location.href = "/main";
        } else{
          alert("로그인에 오류가 발생하였습니다. 다시 로그인 진행해주세요!");
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var cas = localStorage.getItem("cast");
    var rank = localStorage.getItem("rank");

    if (!name || !gender || !password || !email || rank === "-1") {
      alert("모든 항목을 입력하셔야 합니다.");
    } else {
      if (cas === "1") {
        axios
          .post("/api/members/register", {
            name: name,
            gender: gender,
            pw: password,
            email: email,
            types: rank,
          })
          .then((res) => console.log(res));
        alert(`반갑습니다. ${name}님! 로그인을 진행해주세요`);
        setShowModal(false);
      } else if (cas === "0") {
        alert("이메일 인증을 먼저 진행해주세요.");
      }
    }
  };

  useEffect(() => {
    
    localStorage.setItem("cast", 0);
    localStorage.setItem("rank", -1);
    localStorage.setItem("vest", 0);

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInViewPort(true);
          setTimeout(() => {
            setShowSecondContainer(true);
          }, 2000); 
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    if (element.current) {
      observer.observe(element.current);
    }
  }, []);

  return (
    <div className="StartAnimation">
      <StyledAboutContainer ref={element} className={inViewPort ? 'animation' : ''}>
        <StyledAboutImage src={sight} alt="시작 이미지" />
        <br />
        <br />
        <AboutTitle className={inViewPort ? 'animation' : ''}>
          TripPlannerz
        </AboutTitle>
        <br />
        <br />
        <AboutContent className={inViewPort ? 'animation' : ''}>
          여행을 좋아하시는 분들에게 특별한 경험을 전해드립니다.
        </AboutContent>
      </StyledAboutContainer>
      {showSecondContainer && (
        <StyledAboutContainer className={inViewPort ? 'animation': ''}>
        <AboutContent className={inViewPort ? 'animation' : ''}>
          자유롭게 여행 계획을 세우고, 여행을 같이 가고 싶은 동행자를 찾아보세요.
        </AboutContent>
        <br />
        <br />
        <table>
          <td>
          <AboutButton 
            variant="primary" 
            onClick={handleFirstShow}
          >
             로그인
          </AboutButton>
          <Modal
            className="LoginModal"
            show={firstShowModal}
            onHide={handleFirstClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit = {handleSubmit}>
              <Form.Control
                type="email"
                placeholder="이메일을 입력해주세요"
                onChange={handleEmailChange}
              />
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handlePasswordChange}
              />
              <Button variant="secondary" onClick={handleFirstClose}>
                닫기
              </Button>
              <Button variant="primary" type="submit" onClick={handleJWTLogin}>
                접속하기
              </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handlePasswordModalOpen}
              >
                비밀번호 찾기
              </Button>
              <Modal
               show={passwordModal}
               onHide={handlePasswordModalClose}
              >
              <Modal.Header closeButton>
                <Modal.Title>Find Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Control />
                </Form>
              </Modal.Body>
              </Modal>
            </Modal.Footer>
          </Modal>
          </td>
          <td>
          <AboutButton 
            variant="primary" 
            onClick={handleShow}
          >
            회원가입
          </AboutButton>
          <Modal
          className="SignUpModal"
          style={{ width: "600px", height: "700px" }}
          show={showModal}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                id="name"
                placeholder="이름을 입력해주세요"
                onChange={handleNameChange}
              />
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
              <Form.Control
                type="text"
                id="Email"
                placeholder="이메일을 입력해주세요"
                onChange={handleEmailChange}
              />
            </Form>
            {successEmail !== "1" ? (
              <div>
                <Button onClick={EmailSend}>전송</Button>
                {emailTimer ? (
                  <CountdownTimer onButtonClick={onButtonClick} />
                ) : (
                  ""
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    type="text"
                    id="EmailCode"
                    placeholder="이메일 인증 코드를 입력해주세요"
                    onChange={handleEmailCodeChange}
                  />
                </Form>
                <Button onClick={EmailCheck}>확인</Button>
              </div>
            ) : (
              ""
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="password"
                id="Password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handlePasswordChange}
              />
            </Form>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="password"
                id="Confirmpassword"
                placeholder="비밀번호를 확인하세요"
                onChange={handleConfirmPasswordChange}
              />
            </Form>
            {confirmPassword === ""
              ? ""
              : correct === true
              ? "비밀번호 일치"
              : "비밀번호 불일치"}
            <br />
            <br />
            <Button
              style={{ marginLeft: "40%" }}
              variant="secondary"
              onClick={handleNestedModal}
            >
              태그선택
            </Button>

            {nestedModal && (
              <Modal
                className="TagModal"
                style={{ width: "600px", height: "700px" }}
                show={handleNestedModal}
                onHide={handleCloseNested}
              >
                <Modal.Header closeButton>
                  <Modal.Title>태그</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <SelectPreference />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCloseNested}
                  >
                    확인
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal>
          </td>
        </table>
        </StyledAboutContainer>
      )}
    </div>
  );
}

export default StartAnimation;
