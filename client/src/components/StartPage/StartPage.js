import React,{useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../Image/Logo.png';
import {Button, Form, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

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

const onPhoneNumberHandler = async(phoneNumber) => {
    try{
      const response = await axios.post('/api/auth/sms', {
        phoneNumber: phoneNumber
      });
      console.log(response.data);  
    }
    catch(error){
        console.log(error);
    }
}


   return(
    <div>
        <NavBar />
    <div style={{marginLeft:"42%", marginTop:"15%"}}>
       <img src={Logo} alt="로고" style={{width:"327px", height:"274px"}} />
       <br />
       {/* <button style={{width:"295px", height:"61px", marginLeft:"15px",marginTop:"15px" ,backgroundColor:"#AA0140", color:"#FFFFFF"}} onClick={openModal}>Login</button>
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
                     <Button style={{marginLeft: "200px", marginTop:"100px", backgroundColor:"#FFFFFF", color:"black", width:"150px"}}>Enter</Button>
                    </div>
                </Form>
            </div>
         </Modal>
       } */}
       <br />
       {/* <button style={{width:"295px", height:"61px", marginLeft:"15px", marginTop:"15px" ,backgroundColor:"#000000", color:"#FFFFFF"}} onClick={openSecondModal}>Register</button>
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
                  <Button style={{marginLeft:"200px" , backgroundColor:"#FFFFFF", color:"black", width:"150px"}}>Submit</Button>
                </div>
                </Form>
            </div>
          </Modal>
       } */}
    </div>
    <Footer />
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
