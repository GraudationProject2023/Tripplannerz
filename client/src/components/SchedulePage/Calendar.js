import React , {useEffect} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

function DateHeader(props){
    const {dates} = props;

    const dateToArray = (dates) => {
        if(Array.isArray(dates)){
            return dates
        } else if(typeof dates === "string"){
            return dates.split(',')
        }
        else {
            return ["일","월","화","수","목","금","토"]
        }
    };

    const mapArrayToDate = (dateArray) => {
        try{
            if(dateArray.length !== 7){
                console.log(new Error("dates props must be had 7 date"))
                dateArray=["일","월","화","수","목","금","토"]
            }

            return dateArray.map((date, index) => {
                const className = () => {
                    let className ="RCA-calendar-date-component";
                    if(index === 0) {
                        return className + " date-sun"
                    } else if(index === 6) {
                        return className + " date-sat"
                    } else {
                        return className + " date-weekday"
                    }
                }

                return (
                    <div className={className()} key={"RCA-header-" + date}>
                        {date}
                    </div>
                )
            })
        } catch{
            throw new Error("date must be string or component")
        }
    }

    return(
        <div className = "RCA-calendar-date-header">
            {mapArrayToDate(dateToArray(dates))}
        </div>
    );
}
function Week(props) {

    const {firstDayOfThisWeekformat, weekIndex, ymOfThisCalendar, selected, fn, YM} = props;
    const Days = (firstDayFormat, weekIndex) => {
        const _days = [];

        for (let i = 0; i < 7; i++) {

            const Day = moment(firstDayFormat).add(i, 'd');
            _days.push({
                yearMonthDayFormat: Day.format("YYYY-MM-DD"),
                getDay: Day.format('D'),
                isHolyDay: false,
                weekIndex
            });
        }

        return _days;
    }

    const mapDaysToComponents = (Days, calendarMonthYear, selectedDayFormat, fn = () => {
    }) => {

        const thisMonth = moment(calendarMonthYear);
        return Days.map((dayInfo, i) => {

            let className = "date-weekday-label";

            if (!thisMonth.isSame(dayInfo.yearMonthDayFormat, 'month')) {
                className = "date-notThisMonth";
            } else if (i === 0) {
                className = "date-sun"
            } else if (i === 6) {
                className = "date-sat"
            }

            if (moment(dayInfo.yearMonthDayFormat).isSame(selectedDayFormat, 'day')) {
                className = "selected"
                
            }

            return (
                <Link to ="todolist" state={{YM, day:dayInfo.getDay}} className={"RCA-calendar-day " + className} key={`RCA-${dayInfo.weekIndex}-${i}-day`}
                     onClick={() => fn(dayInfo.yearMonthDayFormat)}>
                    <label className="RCA-calendar-day-label">
                        {dayInfo.getDay}
                    </label>
                </Link>
            )
        })
    }

    return (
        <div className="RCA-calendar-week">
            {mapDaysToComponents(Days(firstDayOfThisWeekformat, weekIndex),
                ymOfThisCalendar,
                selected,
                fn
            )}
        </div>
    )
}

function Calendar(props) {

    const {YM, selected, changeSelected, calendarYM} = props

    const Weeks = (monthYear, selected, clickFn) => {
        const firstDayOfMonth = moment(monthYear).startOf('month');
        const firstDateOfMonth = firstDayOfMonth.get('d');

        const firstDayOfWeek = firstDayOfMonth.clone().add(-firstDateOfMonth, 'd');

        const _Weeks = [];

        for (let i = 0; i < 6; i++) {
            _Weeks.push((
                <Week key={`RCA-calendar-week-${i}`}
                      weekIndex={i}
                      ymOfThisCalendar={firstDayOfMonth.format("YYYY-MM")}
                      firstDayOfThisWeekformat={firstDayOfWeek.clone().add(i * 7, 'd').format("YYYY-MM-DD")}
                      selected={selected}
                      fn={clickFn}
                      YM={calendarYM}
                />
            ))
        }
        return _Weeks
    }

    return (
        <div className="RCA-calendar-container">
            <DateHeader dates={"Sun, Mon, Tue, Wed, Thu, Fri, Sat"}/>
            {Weeks(YM, selected, changeSelected)}
        </div>
    )

}

export default Calendar;
