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

  return (
    <div>
     <Navbar />
     <div className = "container">
      <h1>My Page</h1>
      <div className = "profile-card">
        <h2>Profile</h2>

       </div>
      </div>
    </div>
  );
};

export default MyPage;
