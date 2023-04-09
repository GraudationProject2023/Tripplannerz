import React,{useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../Image/Logo.png';
import {Form, Input, Button} from 'antd';
import axios from 'axios';

var state={
    createAuthCode : "",
    authCodeCheck: false,
};


function StartPage(){

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

 const [Email, setEmail] = useState("");
 const [AuthCode, setAuthCode] = useState("");

 const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
 }
 const onAuthCodeHandler = (event) => {
    setAuthCode(event.currentTarget.value);
 }

 const onSendEmailHandler = (event) => {
    event.preventDefault();
    state.createdAuthCode = Math.random().toString(36).substring(2,8);

    const dataToSubmit = {
        email: Email,
        auth: state.createAuthCode,
    };

    axios.post("/api/users/sendEmail",dataToSubmit)
    .then((response) => {
        alert("인증코드가 발송되었습니다");
    })
    .catch(() => {
        alert("인증코드 전송에 실패하였습니다.");
    })
}
 
const onCheckHandler = (event) => {
    event.preventDefault();

    if(state.createdAuthCode === AuthCode){
        state.authCodeCheck = true;
        alert("이메일 인증에 성공하셨습니다.");
    }
    else{
        state.authCodeCheck = false;
        alert("인증코드가 일치하지 않습니다.");
    }
}


   return(
    <div style={{marginLeft:"42%", marginTop:"15%"}}>
       <img src={Logo} alt="로고" style={{width:"327px", height:"274px"}} />
       <br />
       <button style={{width:"295px", height:"61px", marginLeft:"15px",marginTop:"15px" ,backgroundColor:"#AA0140", color:"#FFFFFF"}} onClick={openModal}>Login</button>
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
                      <Input style={{marginLeft:"130px"}} id="email" placeholder="Enter your email" />
                    </div>
                    <div>
                       <lable>Password</lable>
                       <Input style={{marginLeft: "100px"}} id="password" placeholder="Enter your password" />
                    </div>
                    <div>
                     <Button style={{marginLeft: "200px", marginTop:"100px", backgroundColor:"#FFFFFF", width:"150px"}}>Enter</Button>
                    </div>
                </Form>
            </div>
         </Modal>
       }
       <br />
       <button style={{width:"295px", height:"61px", marginLeft:"15px", marginTop:"15px" ,backgroundColor:"#000000", color:"#FFFFFF"}} onClick={openSecondModal}>Register</button>
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
                <Input id="name" style={{marginLeft:"130px"}} placeholder="Enter your name" />
                </div>
                <br />
                <div>
                <lable>Gender</lable>
                <select id="Gender" name ="Gender" style={{marginLeft:"120px"}}>
                <option defaultValue="(male/female)" hidden>(male/female)</option>
                <option value="male">male</option>
                <option value="female">female</option>
                </select>
                </div>
                <br />
                <div>
                <lable>Email</lable>
                <Input id="email" style={{marginLeft:"135px"}} placeholder="Enter your email" />
                <button style={{marginLeft:"20px"}}>check</button>
                </div>
                <br />
                <div>
                <lable>Code</lable>
                <Input id ="code" style={{marginLeft:"135px"}} placeholder="Enter code which you get" />
                </div>
                <br />
                <div>
                <lable>Password</lable> 
                <Input id="password" style={{marginLeft:"104px"}} placeholder="Enter your password" />  
                </div>
                <br />
                <div>
                <lable>Confirm Password</lable>
                <Input id="password" style={{marginLeft:"40px"}} placeholder="Confirm your password" />
                </div>
                <br />
                <div>
                <lable>Phone Number</lable>
                <Input id="number" style={{marginLeft:"58px"}} placeholder="Enter your phone number" />
                <button style={{marginLeft:"20px"}}>check</button>
                </div>
                <br />
                <div>
                <lable>Code</lable>
                <Input id ="code" style={{marginLeft:"133px"}} placeholder="Enter code which you get" />
                </div>
                <br />
                <br />
                <br />
                <div>
                  <Button style={{marginLeft:"250px"}}>Submit</Button>
                </div>
                </Form>
            </div>
          </Modal>
       }
    </div>
   )
}

export default StartPage;

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
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;
