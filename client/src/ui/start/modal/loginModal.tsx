import { Modal, Form, Button } from 'react-bootstrap';
import type { LoginModalProps } from '@/ui/start/modal/type/loginModal.types';

export const LoginModal = ({show, onHide, onSubmit, onChange, onClick}: LoginModalProps) => {
    return(
        <Modal className="LoginModal" show={show} onHide={onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit = {onSubmit}>
              <Form.Control type="email" placeholder="이메일을 입력해주세요" onChange={onChange.handleEmailChange} />
              <Form.Control type="password" placeholder="비밀번호를 입력해주세요" onChange={onChange.handlePasswordChange} />
              <Button variant="secondary" onClick={onClick.closeLoginModal}>닫기</Button>
              <Button variant="primary" type="submit" onClick={onClick.accessToService}>접속하기</Button>
              </Form>
            </Modal.Body>
          </Modal>
    )
}