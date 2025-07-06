import { createSlice } from '@reduxjs/toolkit';

const initialExpenseState = {
  expenses: [],
  isPremium: false,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: initialExpenseState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
      const total = action.payload.reduce((sum, item) => sum + Number(item.money), 0);
      state.isPremium = total > 10000;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
      const total = state.expenses.reduce((sum, item) => sum + Number(item.money), 0);
      state.isPremium = total > 10000;
    },
  },
});

export const { setExpenses, addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
