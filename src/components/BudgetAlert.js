// src/components/BudgetAlert.js
import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { Alert } from '@mui/material';
import { budgetAlertStore } from '../stores/budgetAlertStore'; // Importar el store de alertas

const BudgetAlert = () => {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    // Instructions:
    // - Calculate the total expenses from the transactions.
    const totalExpense = 0; // Replace with the total expenses calculation.

    // Determine if the budget has been exceeded
    const budgetExceeded = false; // Replace with a comparison of totalExpense and userSettings.totalBudgetLimit

    // Use the useEffect hook to update the budgetAlertStore when the budget is exceeded
    useEffect(() => {
        // Instructions:
        // - If the budget has been exceeded, set the `isVisible` property in the `budgetAlertStore` to true and provide a warning message.
        // - If the budget has not been exceeded, set `isVisible` to false and clear the message.
    }, [budgetExceeded, userSettings.totalBudgetLimit]);

    return (
        // Conditional rendering of the alert
        // Instructions:
        // - If the budget is exceeded, return an `Alert` component with the appropriate message and severity.
        null // Replace with conditional rendering logic
    );
};

export default BudgetAlert;
