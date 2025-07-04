import React from 'react';

const ExpenseCard = ({ expense }) => {
  return (
    <div className="bg-blue-400 text-white rounded-lg py-3 px-4 mb-4 shadow-md">
      <p><strong>Spent:</strong> ₹{expense.money}</p>
      <p><strong>Description:</strong> {expense.desc}</p>
      <p><strong>Category:</strong> {expense.category}</p>
    </div>
  );
};

export default ExpenseCard;
