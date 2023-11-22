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

// import {Modal, Form, Button} from 'react-bootstrap'
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
          {/* <Modal
            className="LoginModal"
            show={firstShowModal}
            onHide={handleFirstClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit = {handleSubmit}>
              <Form.Control
                type="email"
                placeholder="이메일을 입력해주세요"
                onChange={handleEmailChange}
              />
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handlePasswordChange}
              />
              <Button variant="secondary" onClick={handleFirstClose}>
                닫기
              </Button>
              <Button variant="primary" type="submit" onClick={handleJWTLogin}>
                접속하기
              </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handlePasswordModalOpen}
              >
                비밀번호 찾기
              </Button>
              <Modal
               show={passwordModal}
               onHide={handlePasswordModalClose}
              >
              <Modal.Header closeButton>
                <Modal.Title>Find Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Control />
                </Form>
              </Modal.Body>
              </Modal>
            </Modal.Footer>
          </Modal> */}
          </td>
          <td style={{padding: '30px'}}>
          <button>
            회원가입
          </button>
          {/* <Modal
          className="SignUpModal"
          style={{ width: "600px", height: "700px" }}
          show={showModal}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                id="name"
                placeholder="이름을 입력해주세요"
                onChange={handleNameChange}
              />
            </Form>
            <Form onSubmit={handleSubmit}>
              <Form.Select
                id="Gender"
                name="Gender"
                onChange={handleGenderChange}
              >
                <option defaultValue="(male/female)" hidden>
                  (남/여)
                </option>
                <option value="MALE">남</option>
                <option value="FEMALE">여</option>
              </Form.Select>
            </Form>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                id="Email"
                placeholder="이메일을 입력해주세요"
                onChange={handleEmailChange}
              />
            </Form>
            {successEmail !== "1" ? (
              <div>
                <Button onClick={EmailSend}>전송</Button>
                {emailTimer ? (
                  <CountdownTimer onButtonClick={onButtonClick} />
                ) : (
                  ""
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    type="text"
                    id="EmailCode"
                    placeholder="이메일 인증 코드를 입력해주세요"
                    onChange={handleEmailCodeChange}
                  />
                </Form>
                <Button onClick={EmailCheck}>확인</Button>
              </div>
            ) : (
              ""
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="password"
                id="Password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handlePasswordChange}
              />
            </Form>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="password"
                id="Confirmpassword"
                placeholder="비밀번호를 확인하세요"
                onChange={handleConfirmPasswordChange}
              />
            </Form>
            {confirmPassword === ""
              ? ""
              : correct === true
              ? "비밀번호 일치"
              : "비밀번호 불일치"}
            <br />
            <br />
            <Button
              style={{ marginLeft: "40%" }}
              variant="secondary"
              onClick={handleNestedModal}
            >
              태그선택
            </Button>

            {nestedModal && (
              <Modal
                className="TagModal"
                style={{ width: "600px", height: "700px" }}
                show={handleNestedModal}
                onHide={handleCloseNested}
              >
                <Modal.Header closeButton>
                  <Modal.Title>태그</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <SelectPreference />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCloseNested}
                  >
                    확인
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              저장하기
            </Button>
          </Modal.Footer>
        </Modal> */}
          </td>
        </table>
        </div>
    </div>
  );
}

export default StartPage;