import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Trip from '../Image/관광지.png';
import './StartAnimationPage.css'

function movetoStart(){
  window.location.href="/"
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

  useEffect(() => {
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
