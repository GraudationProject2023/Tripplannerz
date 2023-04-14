import React,{useState, useEffect} from 'react';
import moment from 'moment';
import Header from './Header';
import Calendar from './Calendar';
import './style/RCA.css';
import './style/RCA1.css';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

function SchedulePage(){

    const [hasTodo, setHasTodo] = useState(false);
    const [calendarYM, setCalendarYM] = useState(moment());
    const [today, setToday] = useState(moment());
    const [selected, setSelected] = useState(moment().format("YYYY-MM-DD"));

    useEffect(() => {

    }, [])

    const moveMonth = (month) => {
        const newDate = moment(calendarYM.add(month, 'M'));
        setCalendarYM(newDate);
    }

    const clickFn = () => {

    };

    const changeSelected = (clickedDate) => {
        if(moment(clickedDate).isSame(selected,'day')){
            clickFn(clickedDate);
            return;
        }

        setSelected(clickedDate);
        clickFn(clickedDate);

        if(moment(clickedDate).isBefore(calendarYM, 'month')){
            moveMonth(-1);
        }
        else if(moment(clickedDate).isAfter(calendarYM, 'month')){
            moveMonth(1);
        }
    }

    return(
        <div>
          <table>
        <td><div className="test-layout">
            <div className="RCA-app-container">
                <Header calendarYM={calendarYM.format("YYYY년 MM월")}
                        today={today.format("현재 YYYY - MM - DD")}
                        moveMonth={moveMonth}
                />
                <Calendar YM={calendarYM.format("YYYY-MM-DD")}
                          selected={selected}
                          changeSelected={changeSelected}
                          calendarYM = {calendarYM.format("YYYY년 MM월")}
                />
            </div>
            
         </div></td>
         </table>
        </div>
    )
}

export default SchedulePage;