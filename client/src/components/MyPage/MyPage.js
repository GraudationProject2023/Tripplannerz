import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import './MyPage.css'


const MyPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPage, setCurrentPage] = useState('profile');

   useEffect(() => {
                      localStorage.setItem("cast",1);
                      localStorage.setItem("rank",-1);
                      localStorage.setItem("vest",1);
                      document.cookie = 'cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;'
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
                <h5>이메일 : @@@</h5>
          </div>
      );
    }

  const renderAccountPage = () => {
    return(
        <div className = "profile-card">
           <h2>계정 설정 페이지</h2>
           <img alt="프로필" />
                           <h5>이름 : {localStorage.getItem("name")}</h5>
                           <h5>이메일 : @@@</h5>
        </div>
    );
  }

  const renderSchedulePage = () => {
      return(
          <div className = "profile-card">
             <h2>내 일정 페이지</h2>
             <img alt="프로필" />
             <h5>이름 : {localStorage.getItem("name")}</h5>
             <h5>이메일 : @@@</h5>
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
     <div className = "table_n">
     <table>
     <td>
        <div className="content">
              {currentPageComponent}
        </div>
     </td>
     <td>
     <div className = "container">
      <div className = "profile-card">
        <button className={`buttonstyle ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => handlePageChange('profile')}>프로필</button>
        <hr />
        <button className={`buttonstyle ${currentPage === 'account' ? 'active' : ''}`} onClick={() => handlePageChange('account')}>계정 설정</button>
        <hr />
        <button className={`buttonstyle ${currentPage === 'schedule' ? 'active' : ''}`} onClick={() => handlePageChange('schedule')}>내 일정</button>
       </div>
      </div>
      </td>
      </table>
      </div>
    </div>
  );
};

export default MyPage;
