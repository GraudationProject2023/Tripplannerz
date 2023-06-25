import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './MyPage.css'

const MyPage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
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
        {!isEditing ? (
          <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <button onClick={handleEditProfile}>Edit Profile</button>
          </div>
        ) : (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <div className = "button-group">
            <button onClick={handleSaveProfile}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        )}
       </div>
      </div>
    </div>
  );
};

export default MyPage;
