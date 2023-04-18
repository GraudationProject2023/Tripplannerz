import React ,{useState} from 'react';
import {Navbar, Button , FormControl, Form, Container, Nav} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function NavBar(){

    const [modalVisible, setModalVisible] = useState(false);
    const [secondmodalVisible, setSecondModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    }
  
    const closeModal = () => {
      setModalVisible(false);
    }

    const openSecondModal = () => {
        setSecondModalVisible(true);
    }

    const closeSecondModal = () => {
        setSecondModalVisible(false);
    }

    function Welcome() {
        alert('가입이 완료되었습니다. 로그인을 해주세요!');
        setSecondModalVisible(false);
    }

    function Modal({className, onClose , maskClosable , closable , visible, children})
    {
    
    

    const onMaskClick = (e) => {
        if(e.target === e.currentTarget)
        {
            onClose(e)
        }
    }

    const close = (e) => {
        if(onClose){
            onClose(e)
        }
    }

    

    return(
        <>
            <ModalOverlay visible = {visible} />
            <ModalWrapper className ={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" visible={visible}>
                <ModalInner tabIndex ="0" className = "modal-inner">
                    {closable && <button style={{backgroundColor:"#FFFFFF",width:"30px", height:"30px", marginLeft:"500px"}} className="modal-close" onClick={close} >X</button>}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
}

function SecondModal({className, onClose , maskClosable , closable , visible, children})
    {
    
    

    const onMaskClick = (e) => {
        if(e.target === e.currentTarget)
        {
            onClose(e)
        }
    }

    const close = (e) => {
        if(onClose){
            onClose(e)
        }
    }

    

    return(
        <>
            <ModalOverlay visible = {visible} />
            <ModalWrapper className ={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" visible={visible}>
                <ModalInner tabIndex ="0" className = "modal-inner">
                    {closable && <button style={{backgroundColor:"#FFFFFF",width:"30px", height:"30px", marginLeft:"500px"}} className="modal-close" onClick={close} >X</button>}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </>
    )
}

SecondModal.propTypes = {
    visible: PropTypes.bool,
}

function movetomain()
{
    window.location.href="/main";
}


    return(
        <Navbar expand="md" className="justify-content-center navbar-top" fixed="top" style={{border:"1px solid #FFFFFF",backgroundColor:"#FFFFFF",height:"5%"}} >
            <Nav className="me-auto">
                <Nav>
                   <Button style={{backgroundColor:"#FFFFFF",color:"#000000",width:"100px",height:"40px"}}>메인</Button>
                </Nav>
                <Nav style={{marginLeft:"500%"}}>
                    <Button style={{backgroundColor:"#FFFFFF",color:"#000000", width:"100px", height:"40px"}} onClick={openModal}>로그인</Button>
                    {
         modalVisible && <Modal
            visible={modalVisible}
            closable = {true}
            maskClosable={true}
            onClose={closeModal}
         >
            <div>
                <h4>Login</h4>
                <hr />
                <Form>
                    <div>
                      <lable>Email</lable>
                      <FormControl type="email"id="email" placeholder="Enter your email" />
                    </div>
                    <br />
                    <div>
                       <lable>Password</lable>
                       <FormControl type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <div>
                     <Button style={{marginLeft: "200px", marginTop:"100px", backgroundColor:"#FFFFFF", color:"black", width:"150px"}} onClick={movetomain} >Enter</Button>
                    </div>
                </Form>
            </div>
         </Modal>
       }
                </Nav>
                <Nav style={{marginLeft:"5%"}}>
                    <Button style={{width:"100px",height:"40px", backgroundColor:"#FFFFFF", color:"#000000"}} onClick={openSecondModal}>회원가입</Button>
                    {
          secondmodalVisible && <Modal
            visible={secondmodalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeSecondModal}
          >
            <div>
                <h4>Sign Up</h4>
                <hr />
                <Form>
                <div>
                <lable>Name</lable>
                <FormControl type="text" id="name" placeholder="Enter your name" />
                </div>
                <br />
                <div>
                <lable>Gender</lable>
                <Form.Select id="Gender" name ="Gender">
                <option defaultValue="(male/female)" hidden>(male/female)</option>
                <option value="male">male</option>
                <option value="female">female</option>
                </Form.Select>
                </div>
                <br />
                <div>
                <lable>Email</lable>
                <FormControl type="email" id="email" placeholder="Enter your email" />
                <Button>check</Button>
                </div>
                <br />
                <div>
                <lable>Code</lable>
                <FormControl type="text" id ="code" placeholder="Enter code which you get" />
                </div>
                <br />
                <div>
                <lable>Password</lable> 
                <FormControl type="password" id="password" placeholder="Enter your password" />  
                </div>
                <br />
                <div>
                <lable>Confirm Password</lable>
                <FormControl type="password" id="password"  placeholder="Confirm your password" />
                </div>
                <br />
                <div>
                <lable>Phone Number</lable>
                <FormControl type="text" id="number" placeholder="Enter your phone number" />
                <Button>check</Button>
                </div>
                <br />
                <div>
                <lable>Code</lable>
                <FormControl type="text" id ="code" placeholder="Enter code which you get" />
                </div>
                <br />
                <br />
                <br />
                <div>
                  <Button style={{marginLeft:"200px" , backgroundColor:"#FFFFFF", color:"black", width:"150px"}} onClick={Welcome}>Submit</Button>
                </div>
                </Form>
            </div>
          </Modal>
       }
                </Nav>
            </Nav>
        </Navbar>
    )
}

export default NavBar;

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 999;
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.5);
    background-color: #fff;
    border-radius: 10px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;
