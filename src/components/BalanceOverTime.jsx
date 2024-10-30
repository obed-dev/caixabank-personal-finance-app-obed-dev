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

    // 1. Sort the transactions by date.
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2. Calculate the cumulative balance over time.
    let cumulativeBalance = 0;
    const data = sortedTransactions.map((transaction) => {
        cumulativeBalance += transaction.amount; // Adjust cumulative balance with each transaction
        return {
            date: transaction.date, // Transaction date
            Balance: cumulativeBalance, // Current cumulative balance
        };
    });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default BalanceOverTime;
