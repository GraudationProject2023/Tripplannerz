import { useState } from 'react';
import type { Member } from '@/domain/Member';

// import CountdownTimer from "../../util/CountdownTimer";
// import { SelectPreference } from '../../util/SelectPreference';
// import {StyledAboutContainer, StyledAboutImage, AboutTitle, AboutContent, AboutButton } from '../../style/StyleComponent'
// import { EventSourcePolyfill } from "event-source-polyfill";

import { postEmailSend } from '@/application/api/postEmailSend';
import { postEmailConfirm } from '@/application/api/postEmailConfirm';
import { postLoginJwt } from '@/application/api/postLoginJwt';
import { postMemberRegister } from '@/application/api/postMemberRegister'; 
import styles from '@/ui/start/start.module.css';
import sight from '@/lib/image/관광지.png';

// import Footer from '../../components/Footer/Footer';

function StartPage() {

  const [user, setUser] = useState<Member>({
      name: '',
      gender: '',
      email: '',
      pw: '',
      types: [],
  });
  
  const [emailCode, setEmailCode] = useState(''); //이메일 인증 코드
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인

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
          </td>
          <td style={{padding: '30px'}}>
          <button>
            회원가입
          </button>
          {/*  */}
          </td>
        </table>
        </div>
    </div>
  );
}

export default StartPage;