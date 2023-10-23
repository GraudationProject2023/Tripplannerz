import React, { useState } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import { TripCalendar } from '../../components/Calendar/Calendar';
import './BillingPage.css';

const ExpenseCalculator = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div>
      <NavBar />
      <div className='Bill'> 
      <TripCalendar 
        onChange={setCurrentDate} 
        value={currentDate} 
      />
      </div>
    </div>
  );
};

export default ExpenseCalculator;
