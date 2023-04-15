import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavBar from '../Navbar/Navbar';


function InitPage(){
   const [currentMonth, setCurrentMonth] = useState(new Date());
   const [nextMonth, setNextMonth] = useState(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() +1 , 1)
   );

   const handleCurrentMonthChange = (date) => {
      setCurrentMonth(date);
      setNextMonth(new Date(date.getFullYear(), date.getMonth()+1,1));
   }

   const disabledNextMonthDates = (date) => {
      return date < currentMonth;
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
               showMonthYearPicker
            />
          </div></td>
            <td style={{paddingLeft:"100px"}}> <div>
            <h2>오는 날</h2>
            <DatePicker 
               selected={nextMonth}
               minDate={currentMonth}
               filterDate={disabledNextMonthDates}
               showMonthYearPicker
            />
          </div></td>
         </table>
          
         
      </div>
      </div>
   );
}

export default InitPage;