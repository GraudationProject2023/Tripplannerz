import { useState } from 'react';
import { Image } from 'antd';
import type { Member } from '@/domain/Member';
import { useDispatch } from 'react-redux';

import { updateUserInfo } from '@/application/start/updateUserInfo'; 
import { sendEmailToServer } from '@/application/start/sendEmailToServer';
import { sendEmailCodeToServer } from '@/application/start/sendEmailCodeToServer';
import { accessToService } from '@/application/start/accessToService';
import { submitUserInfoToServer } from '@/application/start/submitUserInfoToServer';

import sight from '@/lib/image/관광지.png';

import styles from '@/ui/start/start.module.css';
import { LoginModal } from '@/ui/start/modal/loginModal';
import { SignUpModal } from '@/ui/start/modal/signUpModal';


function StartPage() {

  const dispatch = useDispatch();

  const [user, setUser] = useState<Member>({
      name: '',
      gender: '',
      email: '',
      pw: '',
      types: [],
  });
  
  const [emailCode, setEmailCode] = useState<string>(''); //이메일 인증 코드
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 비밀번호 확인

  const handleNameChange = (event) => { setUser((prevUser) => updateUserInfo(prevUser, 'name', event.target.value))};
  
  const handleGenderChange = (event) => {setUser((prevUser) => updateUserInfo(prevUser, 'gender', event.target.value))};
  
  const handleEmailChange = (event) => {setUser((prevUser) => updateUserInfo(prevUser, 'email', event.target.value))};
  
  const handlePasswordChange = (event) => {setUser((prevUser) => updateUserInfo(prevUser, 'pw', event.target.value))};
  
  const handleEmailCodeChange = (event) => {setEmailCode(event.target.value)};
  
  const handleConfirmPasswordChange = (event) => {setConfirmPassword(event.target.value)};
  
  const handleSendEmailToServer = async(event) => {
    event.preventDefault();
    try {
      await sendEmailToServer(user);
    } catch(error){
      console.error(error);
    }
  };

  const handleSendEmailCodeToServer = async(event) => {
    event.preventDefault();

    try {
      await sendEmailCodeToServer(user, emailCode);
    } catch(error){
      console.error(error);
    }

  };

  const handleAccessToService = async(event) => {
    event.preventDefault();

    try {
      await accessToService(user, dispatch);
    } catch(error){
      console.error(error);
    }
  }

  const handleSubmitUserInfoToServer = async(event) => {
      event.preventDefault();

      try {
        await submitUserInfoToServer(user);
      } catch(error){
        console.log(error);
      }
  }

  return (
      <div className={styles.startContainer}>
        <Image width={'calc(15vw)'} src={sight} alt="시작 이미지" /> 
          <h2>TripPlannerz</h2>
        <table>
          <td>
          <LoginModal
            onSubmit={handleAccessToService} 
            onChange={{ 
              handleEmailChange, 
              handlePasswordChange 
            }} 
            onClick={handleAccessToService} 
          />
          </td>
          <td>
          <SignUpModal  
            onSubmit={handleSubmitUserInfoToServer} 
            onChange={{
              handleNameChange,
              handleGenderChange,
              handleEmailChange,
              handleEmailCodeChange,
              handlePasswordChange,
              handleConfirmPasswordChange
            }} 
            onClick={{
              handleSendEmailToServer,
              handleSendEmailCodeToServer,
            }} />
          </td>
        </table>
    </div>
  );
}

export default StartPage;