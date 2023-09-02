import React, {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'

const StyledAboutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 750px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  background-color: #000000;
  color: #FFFFFF;
  &.animation{
    animation-name: opacity;
    animation-duration: 1000ms;
    animation-fill-mode: forwards;
  }

  @keyframes opacity{
    from{
      opacity: 0;
      transform: translateX(-50%);
    }

    to{
      opacity: 1;
      transform: translateX(0%);
    }
  }
`;

const AboutTitle = styled.h1`
  font-size: 15rem;
  margin-right: 10px;
  @media ${(props) => props.theme.mobile}{
    font-size: 1.2rem;
  }
  margin-left: 15px;

  &.animation{
    animation-name: slide-in;
    animation-duration: 7000ms;
    animation-fill-mode: forwards;
  }
  
  @keyframes slide-in{
    from{
      opacity: 0;
      transform: translateY(-300%);
    }

    to{
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const StyledAboutImage = styled.img`
  display: flex;
  flex-wrap: wrap;
  @media ${(props) => props.theme.desktop}{
    width: 700px;
  }

  @media ${(props) => props.theme.laptop}{
    width: 600px;
  }

  @media ${(props) => props.theme.tablet}{
    width: 550px;
  } 

  object-fit: contain;
`;

function StartAnimation(){
  const element = useRef(null);
  const [inViewPort, setInViewPort] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          setInViewPort(true)
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    })

    if(element.current){
      observer.observe(element.current);
    }
  }, []);

  return(
    <div>
      <StyledAboutContainer
        ref={element}
        className = {inViewPort ? 'animation': ''}
      >
      <div style={{marginLeft: '45%'}}>
         <AboutTitle ref={element} className={inViewPort ? 'animation': ''}>
            TripPlannerz
         </AboutTitle>
      </div>
      </StyledAboutContainer>
    </div>
  )
}

export default StartAnimation

