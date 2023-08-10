import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
axios.default.withCredentials = true;

function Notice() {
  const [order, setOrder] = useState("");

  const handleSelectOrder = (e) => {
    const value = e.target.value;
    setOrder(value);
  };

  return (
    <div>
      <Navbar />
      <div className="profile-card">
        <h2>알림</h2>
        <select className="select" value={order} onChange={handleSelectOrder}>
          <option default>최신 순</option>
          <option value="중요도">좋요도 순</option>
        </select>
        <hr />
      </div>
    </div>
  );
}

export default Notice;
