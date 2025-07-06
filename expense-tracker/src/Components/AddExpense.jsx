import React, { useEffect, useState } from 'react';
import ExpenseCard from './ExpenseCard';
import { getExpenses } from '../Hooks/GetExpenses';
import { setExpenses,addExpense } from '../Store/expenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme,removeTheme } from '../Store/themeSlice';

const AddExpense = () => {
  const [expenses, setExpense] = useState([]);
  const [money, setMoney] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const premium = useSelector((state)=>state.expenses.isPremium);
  const themeColor = useSelector((state)=>state.theme.themeBackground);
  console.log(premium);

  useEffect(() => {
    const fetchExpenses = async () => {
        const data = await getExpenses();
        setExpense(data);
        dispatch(setExpenses(data));
    };
    fetchExpenses();
  }, []);

  useEffect(()=>{
    if(premium){
      dispatch(changeTheme({theme:"dark",themeBackground:"gray"}));
    }else{
      dispatch(removeTheme());
    }
  },[premium]);



  const handleExpenses = async(event) => {
    event.preventDefault();
    try{
        if (category.length <= 0) {
      alert('Select the Category');
      return;
        }
        const newExpense = {
        money: money,
        desc: desc,
        category: category,
        };
        await fetch(`https://expense-tracker-6ddd2-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpense),
        })
        const updatedExpenses = await getExpenses();
        setExpense(updatedExpenses);
        dispatch(addExpense(newExpense));

        setMoney('');
        setDesc('');
        setCategory('');
    }catch(error){
        console.error(error);
    }
  };

  const handleUpdate = (expense)=>{
    setMoney(expense.money);
    setCategory(expense.category);
    setDesc(expense.desc);
    handleDelete(expense.id);
  }

  const handleDelete = async(id)=>{
        console.log(id);
        await fetch(`https://expense-tracker-6ddd2-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,{
            method: 'DELETE',
        })
        const updatedExpenses = expenses.filter((item)=> id !== item.id);
        setExpense(updatedExpenses);
        dispatch(setExpenses(updatedExpenses));
    }

    const handleDownload = () => {
  if (expenses.length === 0) return;

  const csv = [
    ['Money', 'Description', 'Category'],
    ...expenses.map(exp => [exp.money, exp.desc, exp.category])
  ]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'expenses.csv';
  link.click();
  URL.revokeObjectURL(url);
};


  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-5" style={{backgroundColor:themeColor}}>
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
        {premium && <button className='bg-green-400 w-[50%] py-2 rounded-3xl mt-4' type='button' onClick={handleDownload}>Download Expenses</button>}
      </div>

      <div className="mt-10 w-full max-w-md overflow-y-auto max-h-[300px] px-2">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <ExpenseCard key={index} expense={expense} handleDelete = {handleDelete} handleUpdate = {handleUpdate}/>
          ))
        ) : (
          <p className="text-gray-500 text-center">No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;
