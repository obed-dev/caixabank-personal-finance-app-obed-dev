import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MonthlyChart({ transactions }) {
    // Group transactions by month.
    const dataMap = {};

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date); // Assuming transaction has a 'date' field
        const month = date.toLocaleString('default', { month: 'long' }); // Get month name
        const year = date.getFullYear(); // Get year

        const monthYearKey = `${month} ${year}`; // Create a key for month and year

        // Initialize the entry if it doesn't exist
        if (!dataMap[monthYearKey]) {
            dataMap[monthYearKey] = {
                month: monthYearKey,
                income: 0,
                expense: 0,
            };
        }

        // Accumulate the income and expense amounts based on the transaction type
        if (transaction.type === 'income') {
            dataMap[monthYearKey].income += transaction.amount; // Assuming transaction has an 'amount' field
        } else if (transaction.type === 'expense') {
            dataMap[monthYearKey].expense += transaction.amount;
        }
    });

    // Convert the data map into an array and sort it by date
    const data = Object.values(dataMap).sort((a, b) => {
        const [monthA, yearA] = a.month.split(' ');
        const [monthB, yearB] = b.month.split(' ');
        return new Date(`${monthA} 1, ${yearA}`) - new Date(`${monthB} 1, ${yearB}`); // Sort by month and year
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#8884d8" name="Expense" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default MonthlyChart;
