import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import './MyPage.css'
import axios from 'axios';
axios.defaults.withCredentials = true;

const MyPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('profile');
  const [image, setImage] = useState([]);

   useEffect(() => {
                      localStorage.setItem("cast",1);
                      localStorage.setItem("rank",-1);
                      localStorage.setItem("vest",1);
                      document.cookie = 'cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;'
                      setImage(axios.get("http://localhost:8080/api/trip/send"));
    },[]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setNewName(name);
    setNewEmail(email);
  };

  const handleSaveProfile = () => {
    setName(newName);
    setEmail(newEmail);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

   const renderProfilePage = () => {
      return(
          <div className = "profile-card">
             <h2>마이 페이지</h2>
                <img alt="프로필" />
                <h5>이름 : {localStorage.getItem("name")}</h5>
          </div>
      );
    }

  const renderAccountPage = () => {
    return(
        <div className = "profile-card">
           <h2>계정 설정 페이지</h2>
        </div>
    );
  }

  const renderSchedulePage = () => {
      return(
          <div className = "profile-card">
             <h2>내 일정 페이지</h2>
          </div>
      );
    }

  let currentPageComponent;
  if(currentPage === 'profile'){
    currentPageComponent = renderProfilePage();
  }
  else if(currentPage === 'account'){
    currentPageComponent = renderAccountPage();
  }
  else if(currentPage === 'schedule'){
    currentPageComponent = renderSchedulePage();
  }

  return (
    <div>
     <Navbar />
     <div className="content">
        {currentPageComponent}
        <img src = {image} />
     </div>
     <div className = "container">
      <div className = "profile-card">
        <button className={`buttonstyle ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => handlePageChange('profile')}>프로필</button>
        <hr />
        <button className={`buttonstyle ${currentPage === 'account' ? 'active' : ''}`} onClick={() => handlePageChange('account')}>계정 설정</button>
        <hr />
        <button className={`buttonstyle ${currentPage === 'schedule' ? 'active' : ''}`} onClick={() => handlePageChange('schedule')}>내 일정</button>
       </div>
      </div>
    </div>
  );
};

export default MyPage;
