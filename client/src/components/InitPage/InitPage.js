import React, {useState, useEffect} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatePicker,{ Calendar } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from '../Navbar/Navbar';
import Background from '../Image/랜딩페이지 4.png';


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
        <div style={{marginLeft:"35%", marginTop:"15%"}}>
        <img src={Background} alt="배경" style={{width:"100%"}} />
         <table>
            <tr>
               <td>
                  <h1>팀 이름 : &nbsp;</h1>
               </td>
               <td>
                 <input type="text" defaultValue="Trip" />
               </td>
            </tr>
            <br />
         </table>
        </div>
      <div style={{marginLeft:"35%", marginTop:"5%"}}>
         <h1>일정 날짜</h1>
         <table>
            <td><div>
            <h2>가는 날</h2>
            <DatePicker
               selected={currentMonth}
               onChange={handleCurrentMonthChange}
               placeholderText='가는 날 선택'
               popperPlacement='bottom-start'
            />
          </div></td>
            <td style={{paddingLeft:"100px"}}> <div>
            <h2>오는 날</h2>
            <DatePicker
               selected={nextMonth}
               filterDate={disabledNextMonthDates}
               onChange ={handleNextMonthChange}
               placeholderText='오는 날 선택'
               popperPlacement='bottom-start'
            />
          </div></td>
         </table>
         <div>
            {console.log(currentMonth)}
            {console.log(nextMonth)}
         </div>
         <div style={{marginTop:"5%"}}>
            <h3>일정 제목: </h3>
            <input type="text" placeholder="일정의 제목을 입력해주세요." />
            <h4>일정 내용: </h4>
            <textarea type="text" placeholder ="일정 내용을 입력해주세요." />
         </div>
         <div>
           <button onClick={openModal}>일정 생성</button>
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