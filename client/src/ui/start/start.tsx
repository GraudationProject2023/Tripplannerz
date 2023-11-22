import { useState } from 'react';
import type { Member } from '@/domain/Member';
// import { EventSourcePolyfill } from "event-source-polyfill";

import { postEmailSend } from '@/application/api/postEmailSend';
import { postEmailConfirm } from '@/application/api/postEmailConfirm';
import { postLoginJwt } from '@/application/api/postLoginJwt';
import { postMemberRegister } from '@/application/api/postMemberRegister'; 

import sight from '@/lib/image/관광지.png';

import styles from '@/ui/start/start.module.css';
import { LoginModal } from '@/ui/start/modal/loginModal';
import { SignUpModal } from '@/ui/start/modal/signUpModal';


function StartPage() {

  const [user, setUser] = useState<Member>({
      name: '',
      gender: '',
      email: '',
      pw: '',
      types: [],
  });
  
  const [emailCode, setEmailCode] = useState<string>(''); //이메일 인증 코드
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 비밀번호 확인
  
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false); //로그인 모달
  const [toggleSignUpModal, setToggleSignUpModal] = useState<boolean>(false); //회원가입 모달

  const sendEmailToServer = async(event) => {
    event.preventDefault();

    if(user.email){
      const response = await postEmailSend(user.email);
      console.log(response);
    }
   
    throw new Error('Email is not valid')
  };

  const sendEmailCodeToServer = async(event) => {
    event.preventDefault();

    if(user.email){
      const response = await postEmailConfirm(user.email, emailCode);
      console.log(response);
    }

    throw new Error('Email is not valid')
  };

  const accessToService = async(event) => {
    event.preventDefault();

    if(user.email && user.pw) {
      const response = await postLoginJwt(user.email, user.pw);
      console.log(response);
    }
  }

  const submitUserInfoToServer = async(event) => {
      event.preventDefault();

      if(user.name && user.gender && user.email && user.pw && user.types){
        const response = await postMemberRegister(
          user.name, 
          user.gender,
          user.email, 
          user.pw,  
          user.types 
        )

        console.log(response);
      }
  }

  return (
    <div className={styles.startContainer}>
      <div className={styles.startAnimationContainer}>
        <img src={sight} alt="시작 이미지" />
        <br />
        <br />
          TripPlannerz
        <br />
        <br />
          여행을 좋아하시는 분들에게 특별한 경험을 전해드립니다.
      </div>
      <div className={styles.startAnimationContainer}>
          자유롭게 여행 계획을 세우고, 여행을 같이 가고 싶은 동행자를 찾아보세요.
        <br />
        <br />
        <table>
          <td>
          <button>
             로그인
          </button>
          <LoginModal />
          </td>
          <td style={{padding: '30px'}}>
          <button>
            회원가입
          </button>
          <SignUpModal />
          </td>
        </table>
        </div>
    </div>
  );
}

export default StartPage;