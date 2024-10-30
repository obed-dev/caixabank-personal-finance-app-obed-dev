import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function BalanceOverTime() {
    const transactions = useStore(transactionsStore);

    // Sort transactions by date
    const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate the cumulative balance
    const data = [];
    let cumulativeBalance = 0;

    sortedTransactions.forEach((transaction) => {
        // Assuming transaction has a date and amount field, and type (income or expense)
        cumulativeBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;

        // Push the date and cumulative balance into the data array
        data.push({
            date: transaction.date,
            Balance: cumulativeBalance,
        });
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis />
                <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
                <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default BalanceOverTime;
