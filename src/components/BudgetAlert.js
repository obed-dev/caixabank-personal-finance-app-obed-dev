import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { Alert } from '@mui/material';
import { budgetStore } from '../stores/budgetAlertStore'; // Import the budget store
 // Import alert store

const BudgetAlert = () => {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);
   

    // Calculate the total expenses from the transactions
    const totalExpense = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    // Determine if the budget has been exceeded
    const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

    // Use the useEffect to update the budgetAlertStore when the budget is exceeded
    useEffect(() => {
        if (budgetExceeded) {
            budgetStore.set({
                isVisible: true,
                message: `¡You have exceeded your budget limit of ${userSettings.totalBudgetLimit} `,
                notificationCount: budgetStore.get().notificationCount + 1,
            });
        } else {
            budgetStore.set({
                isVisible: false,
                message: '',
                notificationCount: 0,
            });
        }
    }, [budgetExceeded, userSettings.totalBudgetLimit, totalExpense]);

    return (
        // Conditional alert rendering
        <>
            {budgetStore.get().isVisible && (
                <Alert severity="warning" onClose={() => budgetStore.set({ ...budgetStore.get(), isVisible: false })}>
                    {budgetStore.get().message}
                </Alert>
            )}
        </>
    );
};

export default BudgetAlert;
