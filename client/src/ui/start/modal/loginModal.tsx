import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { LoginModalProps } from '@/ui/start/modal/type/loginModal.types';

export const LoginModal = ({ onSubmit, onChange, onClick}: LoginModalProps) => {
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false);
  
  const openLoginModal = () => {
    setToggleLoginModal(true);
  }

  const closeLoginModal = () => {
    setToggleLoginModal(false);
  }

  return (
    <div>
      <Button onClick={openLoginModal}>
       로그인
      </Button>
      <Modal show={toggleLoginModal} onHide={closeLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit = {onSubmit}>
          <Form.Control type="email" placeholder="이메일을 입력해주세요" onChange={onChange.handleEmailChange} />
          <Form.Control type="password" placeholder="비밀번호를 입력해주세요" onChange={onChange.handlePasswordChange} />
          <Button variant="secondary" onClick={closeLoginModal}>닫기</Button>
          <Button variant="primary" type="submit" onClick={onClick}>접속하기</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}