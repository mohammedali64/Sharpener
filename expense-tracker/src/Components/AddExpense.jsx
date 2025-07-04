import React, { useState } from 'react';
import ExpenseCard from './ExpenseCard';

const AddExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [money, setMoney] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');

  const handleExpenses = (event) => {
    event.preventDefault();
    if (category.length <= 0) {
      alert('Select the Category');
      return;
    }
    const newExpense = {
      money: money,
      desc: desc,
      category: category,
    };
    setExpenses([...expenses, newExpense]);
    setMoney('');
    setDesc('');
    setCategory('');
  };

  return (
    <div className="flex flex-col items-center bg-amber-100 min-h-screen py-10 px-5">
      <div className="text-4xl font-bold text-center">Track Your Expenses</div>

      <div className="mt-10 w-full max-w-md shadow-2xl rounded-2xl bg-amber-200 py-10 px-6">
        <form onSubmit={handleExpenses} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="money-spent">Money Spent:</label>
            <input
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              type="number"
              id="money-spent"
              className="border-2 rounded-sm w-full border-gray-600 px-2 py-1"
            />
          </div>

          <div>
            <label htmlFor="desc">Description:</label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              id="desc"
              className="border-2 rounded-sm w-full border-gray-600 px-2 py-1"
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              className="border-2 rounded-lg w-full border-gray-600 px-2 py-1"
            >
              <option value="">--Select--</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Grocery">Grocery</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-red-400 text-white font-semibold py-2 rounded-3xl mt-5"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Scrollable expense list */}
      <div className="mt-10 w-full max-w-md overflow-y-auto max-h-[300px] px-2">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <ExpenseCard key={index} expense={expense} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
