import React, {useState} from 'react';
import moment from 'moment';
import DatePicker,{ Calendar } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from '../Navbar/Navbar';


function InitPage(){
   const [currentMonth, setCurrentMonth] = useState(new Date(moment().startOf('day')));
   const [nextMonth, setNextMonth] = useState(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() +1 , 1)
   );

   const handleCurrentMonthChange = (date) => {
      setCurrentMonth(date);
   }

   const handleNextMonthChange = (date) => {
      setNextMonth(date);
   }

   const disabledNextMonthDates = (date) => {
      return  date > new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate() -1 );
   };


   return(
      <div>
        <NavBar />
      <div style={{marginLeft:"35%", marginTop:"15%"}}>
         <h1>일정 날짜</h1>
         <table>
            <td><div>
            <h2>가는 날</h2>
            <DatePicker
               selected={currentMonth}
               onChange={handleCurrentMonthChange}
               placeholderText='가는 날 선택'
               popperPlacement='bottom-start'
               inline
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
               inline
            />
          </div></td>
         </table>
         <div>
            {console.log(currentMonth)}
            {console.log(nextMonth)}
         </div>
         
      </div>
      </div>
   );
}

export default InitPage;