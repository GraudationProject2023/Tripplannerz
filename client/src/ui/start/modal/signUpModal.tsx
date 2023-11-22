import { Modal, Form, Button } from 'react-bootstrap';

export const SignUpModal = () => {
    return(
    <Modal
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
        </Modal>
    )
}
