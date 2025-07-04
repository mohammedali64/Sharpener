import React from 'react'

export const getExpenses = async () => {
        try{
            const response = await fetch(
            'https://expense-tracker-6ddd2-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json'
            );
            const data = await response.json();
            const loadedExpenses = [];

            for (const key in data) {
            loadedExpenses.push({
                id: key,
                ...data[key],
            });
            }
            return loadedExpenses;
        }catch(error){
            console.log(error.message);
        }

};
