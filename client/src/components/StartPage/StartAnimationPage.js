import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Trip from '../Image/관광지.png';
import './StartAnimationPage.css'

function movetoStart(){
  window.location.href="/start"
}


const StyledAboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-y: auto;
  align-items: center;
  opacity: 0;
  background-color: #000000;
  color: #FFFFFF;
  &.animation {
    animation-name: opacity;
    animation-duration: 1000ms;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
  }

  @keyframes opacity {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const AboutTitle = styled.h1`
  font-size: 150rem;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.2rem;
  }
  margin: 0;

  &.animation {
    animation-name: slide-in;
    animation-duration: 3000ms;
    animation-fill-mode: forwards;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const AboutContent = styled.h1`
  font-size: 150rem;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.2rem;
  }
  margin: 0;

  &.animation {
    animation-name: slide-in;
    animation-duration: 3000ms;
    animation-fill-mode: forwards;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const AboutButton = styled.button`
  background-color: black; 
  color: white;
  border-radius : 10px;
  transition: background-color 0.3s, color 0.3s;

  &.animation {
    animation-name: slide-in;
    animation-duration: 3000ms;
    animation-fill-mode: forwards;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(-50%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  &:hover {
    background-color: white; 
    color: black;
  }
`;

const StyledAboutImage = styled.img`
  display: flex;
  @media ${(props) => props.theme.desktop} {
    width: 500px;
  }

  @media ${(props) => props.theme.laptop} {
    width: 400px;
  }

  @media ${(props) => props.theme.tablet} {
    width: 300px;
  }

  object-fit: contain;
`;


function StartAnimation() {
  const element = useRef(null);
  
  const [inViewPort, setInViewPort] = useState(false);
  
  const [showSecondContainer, setShowSecondContainer] = useState(false); 
  
  const [showModal, setShowModal] = useState(false);
  
  const [firstShowModal, setFirstShowModal] = useState(false);
  
  const [name, setName] = useState(""); //이름
  
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
        .post("http://localhost:8080/api/members/emailConfirm", {
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
        "http://localhost:8080/api/members/emailConfirmCode",
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
        "http://localhost:8080/api/members/loginJWT",
        credentialDto
      ).then((res) => 
      {
        const token = res.data.token
        if(token !== null){
        localStorage.setItem("token", token);
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
          .post("http://localhost:8080/api/members/register", {
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
        <StyledAboutImage src={Trip} alt="시작 이미지" />
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
        <AboutButton onClick={movetoStart}>
          서비스 시작하기
        </AboutButton>
        </StyledAboutContainer>
      )}
    </div>
  );
}

export default StartAnimation;
