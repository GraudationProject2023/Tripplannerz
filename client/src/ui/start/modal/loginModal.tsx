import { Modal, Form, Button } from 'react-bootstrap';

export const LoginModal = () => {
    return(
        <Modal
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
          </Modal>
        )
}