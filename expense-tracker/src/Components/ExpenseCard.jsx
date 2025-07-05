import React from 'react';

const ExpenseCard = ({ expense,handleDelete, handleUpdate }) => {
    
  return (
    <div className="bg-blue-400 text-white rounded-lg py-3 px-4 mb-4 shadow-md flex justify-between">
      <div>
            <p><strong>Spent:</strong> ₹{expense.money}</p>
            <p><strong>Description:</strong> {expense.desc}</p>
            <p><strong>Category:</strong> {expense.category}</p>
      </div>
      <div>
            <button onClick={()=>handleUpdate(expense)} className='bg-red-500 px-1.5 rounded-3xl mr-2'>Edit</button>
            <button onClick={()=> handleDelete(expense.id)} className='bg-red-500 px-1.5 rounded-3xl'>X</button>
      </div>
    </div>
  );
};

export default ExpenseCard;
