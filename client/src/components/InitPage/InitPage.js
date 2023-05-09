import React, {useState, useEffect} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatePicker,{ Calendar } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from '../Navbar/Navbar';
import Image from '../Image/새일정페이지 1.png';
import {Button, Form} from 'react-bootstrap';


const Autocomplete = ({items}) => {
   const [inputValue, setInputValue] = useState('');
   const [suggestions, setSuggestions] = useState([]);

   const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      if(value.length > 0) {
         const filteredItems = items.filter((item) => 
           item.toLowerCase().startsWith(value.toLowerCase())
         );
         setSuggestions(filteredItems);

      } else {
         setSuggestions([]);
      }
   };

   const handleSelectSuggestion = (value) => {
      setInputValue(value);
      setSuggestions([]);
   };

   return (
      <div>
         <input type="text" value={inputValue} onChange={handleInputChange} placeholder = "Type member name" />
          {suggestions.length > 0 && (
            <ul>
               {suggestions.map((suggestion) => (
                  <li key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}
                  >
                     {suggestion}
                  </li>
               ))}
            </ul>
          )}
      </div>
   )
}

function InitPage(){

   useEffect(() => {
     localStorage.setItem("vest",1);
   },[])

   const [currentMonth, setCurrentMonth] = useState(new Date(moment().startOf('day')));
   const [nextMonth, setNextMonth] = useState(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() +1 , 1)
   );

   const [modalVisible, setModalVisible] = useState(false);
   const members = ['John','Jane','Jacob','Josh','Jessie'];
   
   const openModal = () => {
      setModalVisible(true);
   }

   const closeModal = () => {
      setModalVisible(false);
   }


   const handleCurrentMonthChange = (date) => {
      setCurrentMonth(date);
   }

   const handleNextMonthChange = (date) => {
      setNextMonth(date);
   }

   const disabledNextMonthDates = (date) => {
      return  date > new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate() -1 );
   };

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

   return(
      <div>
        <NavBar />
        <img src={Image} alt="새일정페이지" style={{width:"100%", height:"1000px", marginTop:"-300px"}} />
        <div style={{marginTop:"5%", border:"1px solid black", borderWidth:"5px"}}>
          <Form>
            <table>
            <td><Form.Label style={{fontSize:"20px"}}>팀 이름  &nbsp; &nbsp; </Form.Label></td>
            <td style={{padding:"10px"}}><Form.Control type="text" id="Team" placeholder="팀 이름을 입력하세요." style={{width: "430px"}} />
            </td>
            </table>
          </Form>
            <Form>
                   <table>
                   <td>
                   <Form.Label style={{fontSize:"20px"}}>일정 날짜 &nbsp; &nbsp;</Form.Label>
                      </td>
                      <td>
                      <table>
                      <td>
                      <h5>가는 날 </h5>
                      <DatePicker
                         selected={currentMonth}
                         onChange={handleCurrentMonthChange}
                         placeholderText='가는 날 선택'
                         popperPlacement='bottom-start'
                      />
                      </td>
                      <td style={{padding:"50px"}}>
                      <h5>오는 날</h5>
                      <DatePicker
                         selected={nextMonth}
                         filterDate={disabledNextMonthDates}
                         onChange ={handleNextMonthChange}
                         placeholderText='오는 날 선택'
                         popperPlacement='bottom-start'
                      />
                      </td>
                   </table>
                   </td>
                   </table>
                </Form>
                 <Form>
                 <table>
                    <td>
                    <Form.Label style={{fontSize:"20px"}}>일정 제목 &nbsp;</Form.Label>
                    </td>
                    <td>
                    <Form.Control type="text" placeholder="일정의 제목을 입력해주세요." style={{width:"430px"}} />
                    </td>
                 </table>
                 </Form>
                 <Form>
                   <table>
                   <td>
                   <Form.Label style={{fontSize:"20px"}}>일정 내용 &nbsp;</Form.Label>
                   </td>
                   <td>
                   <textarea class="form-control" placeholder ="일정 내용을 입력해주세요." style={{width:"430px", height:"200px"}} />
                   </td>
                   </table>
                 </Form>
                   <Button style={{marginLeft:"25%", marginTop:"5%"}} onClick={openModal}>일정 생성</Button>
                   {
                           modalVisible && <Modal
                            visible = {modalVisible}
                            closable = {true}
                            maskClosable = {true}
                            onClose = {closeModal}
                           >
                           <h2>멤버 검색</h2>
                            <Autocomplete items = {members} />
                           </Modal>
                    }
        </div>
        <div>
            {console.log(currentMonth)}
            {console.log(nextMonth)}
        </div>
      </div>
   );
}

export default InitPage;

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
    max-height: 51vh;
    ::-webkit-scrollbar{
        display:none;
    }
    overflow-y:auto;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;