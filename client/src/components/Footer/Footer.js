import React, { useState } from "react";
import {footerStyle, linkStyle , tooltipStyle, linkContainerStyle} from '../../style/StyleComponent'

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
          <br />
          <a href="https://www.freepik.com/icon/chat_4161013#fromView=keyword&term=Chat&page=1&position=66">Icon by SumberRejeki</a>
          <br />
          <a href="https://www.flaticon.com/free-icons/error" title="error icons">Error icons created by Vectors Market - Flaticon</a>
        </span>
      </div>
    </div>
  );
}

export default Footer;
