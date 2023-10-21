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

export const PageUl = styled.ul`
  display: absolute;
  flex-direction: row;
  float: center;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 0px;
`;

export const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 0px;
  border-radius: 5px;
  width: 35px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #000000;
  }
  &:focus {
    color: white;
    background-color: #000000;
  }
`;

export const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus {
    color: white;
    background-color: #263a6c;
  }
`;


export const footerStyle = {
  backgroundColor: "#000000",
  color: "#FFFFFF",
  padding: "20px",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "14px",
  height: "55px",
};

export const linkStyle = {
  color: "#FFFFFF",
  textDecoration: "none",
  marginTop: "-100%",
  marginLeft: "40%",
};

export const tooltipStyle = {
  marginTop: "-8%",
  marginLeft: "70%",
  transform: "translateX(-50%)",
  backgroundColor: "#333",
  color: "#fff",
  padding: "5px",
  fontSize: "12px",
  borderRadius: "3px",
  whiteSpace: "nowrap",
  display: "none",
};

export const linkContainerStyle = {
  marginTop: "-1.8%",
};
