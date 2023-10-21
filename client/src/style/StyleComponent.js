import styled from 'styled-components';

export const StyledAboutContainer = styled.div`
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

export const StyledAboutImage = styled.img`
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

export const AboutTitle = styled.h1`
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

export const AboutContent = styled.h1`
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

export const AboutButton = styled.button`
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

