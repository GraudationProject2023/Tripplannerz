import React, { useState } from 'react';
import NavBar from '../../components/Navbar/Navbar';
import './BillingPage.css';

const ExpenseCalculator = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseInput, setExpenseInput] = useState('');

  const handleExpenseChange = (e) => {
    setExpenseInput(e.target.value);
  };

  const addExpense = () => {
    if (isNaN(expenseInput)) {
      alert('숫자를 입력해주세요!');
      return;
    }

    const newExpense = parseFloat(expenseInput);
    setTotalExpense((prevTotal) => prevTotal + newExpense);
    setExpenseInput('');
  };

  return (
    <div>
      <NavBar />
      <div className='Bill'>
      <h1>여행 경비 계산기</h1>
      <p>총 경비: {totalExpense}원</p>
      <input
        type="text"
        value={expenseInput}
        onChange={handleExpenseChange}
        placeholder="경비를 입력하세요"
      />
      <button onClick={addExpense}>추가</button>
      </div>
    </div>
  );
};

export default ExpenseCalculator;
