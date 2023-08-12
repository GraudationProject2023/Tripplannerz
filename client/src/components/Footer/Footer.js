import React, { useState } from "react";

const footerStyle = {
  backgroundColor: "#000000",
  color: "#FFFFFF",
  padding: "20px",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "14px",
  height: "55px",
};

const linkStyle = {
  color: "#FFFFFF",
  textDecoration: "none",
  marginTop: "-100%",
  marginLeft: "40%",
};

const tooltipStyle = {
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

const linkContainerStyle = {
  marginTop: "-1.8%",
};

function Footer() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltip = (isShow) => {
    setShowTooltip(isShow);
  };

  return (
    <div style={footerStyle}>
      <div>
        <h6>프론트엔드: 이동욱 | 백엔드: 홍용현, 최성보</h6>
      </div>
      <div
        style={linkContainerStyle}
        onMouseEnter={() => handleTooltip(true)}
        onMouseLeave={() => handleTooltip(false)}
      >
        <span style={linkStyle}>저작권표시</span>
        <span
          style={{ ...tooltipStyle, display: showTooltip ? "block" : "none" }}
        >
          비디오 제작: Veed.io
          <br />
          지도 및 위치 아이콘 제작자: Freepik - Flaticon
          <br />
          이미지 출처: rawpixel.com - Freepik에서 가져옴
        </span>
      </div>
    </div>
  );
}

export default Footer;
