import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { CircularProgress, Typography, Box } from '@mui/material';

function Recommendations() {
    const transactions = useStore(transactionsStore);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate data loading and handle possible errors
        setLoading(true);
        setTimeout(() => {
            // Simulate error in case of failure (optional)
            // Uncomment the next line to simulate an error
            // setError("Failed to load transactions.");
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        // Show a loading indicator while data is being fetched
        return <CircularProgress />;
    }

    if (error) {
        // Display an error message if something goes wrong
        return <Typography color="error">{error}</Typography>;
    }

    // Implement logic to compare expenses between months
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter expenses for the current month and last month
    const expenses = transactions.filter(transaction => transaction.type === 'expense');

    const expenseThisMonth = expenses
        .filter(transaction => {
            const date = new Date(transaction.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        })
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenseLastMonth = expenses
        .filter(transaction => {
            const date = new Date(transaction.date);
            return date.getMonth() === currentMonth - 1 && date.getFullYear() === currentYear;
        })
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Generate a message based on the comparison between months
    let message = '';

    if (expenseLastMonth === 0) {
        message = "You had no expenses last month. Keep recording your expenses!";
    } else if (expenseThisMonth > expenseLastMonth) {
        const increasePercentage = ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) * 100;
        message = `Your expenses increased by ${increasePercentage.toFixed(2)}% compared to last month. Consider reviewing your spending.`;
    } else if (expenseThisMonth < expenseLastMonth) {
        const decreasePercentage = ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) * 100;
        message = `Congratulations! Your expenses decreased by ${decreasePercentage.toFixed(2)}% compared to last month.`;
    } else {
        message = "Your spending hasn't changed compared to last month.";
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Recommendations</Typography>
            {/* Display the recommendation message according to the change in expenditure */}
            <Typography>{message}</Typography>
        </Box>
    );
}

export default Recommendations;
