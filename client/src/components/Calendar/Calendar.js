import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './Calendar.css'
import moment from 'moment'
import { createDot } from '../../util/createDot'
import { Schedule } from './Schedule/Schedule'

export const TripCalendar = ({
    onChange,
    value
}) => {
    return(
        <div>   
          <Calendar 
          onChange={onChange} 
          formatDay={(
            locale,date
          ) => moment(date)
          .format('DD')}
          navigationLabel={null}
          minDetail='month'
          maxDetail='month'
          className='mx-auto w-full text-sm border-b'
          titleContent = { ({date, view}) => {createDot()}}
          value={value}
          />
          <Schedule value={value} />
        </div>  
    )
}