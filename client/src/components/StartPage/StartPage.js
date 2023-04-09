import React,{useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../Image/Logo.png';
import {Form, Input, Button} from 'antd';


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

   return(
    <div>
       <img src={Logo} alt="로고" style={{width:"327px", height:"274px"}} />
       <br />
       <button style={{width:"295px", height:"61px", backgroundColor:"#AA0140", color:"#FFFFFF"}} onClick={openModal}>Login</button>
       {
         modalVisible && <Modal
            visible={modalVisible}
            closable = {true}
            maskClosable={true}
            onClose={closeModal}
         >
            <div>
                <h4>Login</h4>
                <Form>
                    <div>
                      <label>Email</label>
                      <Input style={{marginLeft:"130px"}} id="email" placeholder="Enter your email" />
                    </div>
                    <div>
                       <label>Password</label>
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
       <button style={{width:"295px", height:"61px", backgroundColor:"#000000", color:"#FFFFFF"}} onClick={openSecondModal}>Register</button>
       {
          secondmodalVisible && <Modal
            visible={secondmodalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeSecondModal}
          >
            <div>
                <h4>Sign Up</h4>
                <Form>
                    
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
