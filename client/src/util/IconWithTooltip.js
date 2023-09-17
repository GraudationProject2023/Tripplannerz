import React, { useState } from 'react';
import axios from 'axios';
import './IconWithTooltip.css';

const IconWithTooltip = ({ iconSrc }) => {
  const [tooltipData, setTooltipData] = useState(null);

  const handleIconHover = async () => {
    try {
      const response = await axios.get('your_server_endpoint');
      const data = response.data;

      if (!data) {
        setTooltipData('알림 없음');
      } else {
        setTooltipData(data.your_data_property); // 데이터 속성에 따라 수정 필요
      }
    } catch (error) {
      console.error('서버와의 통신에 문제가 발생했습니다.', error);
      setTooltipData('알림 없음');
    }
  };

  return (
    <div className="icon-container">
      <img
        src={iconSrc}
        alt="Icon"
        className="icon"
        onMouseOut={() => setTooltipData(null)}
      />
      {tooltipData && <div className="tooltip">{tooltipData}</div>}
    </div>
  );
};

export default IconWithTooltip;