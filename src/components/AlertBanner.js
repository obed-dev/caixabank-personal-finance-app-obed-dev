import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { userSettingsStore } from '../stores/userSettingsStore';
import { Alert, Collapse } from '@mui/material';

function AlertBanner() {
    const transactions = useStore(transactionsStore);
    const userSettings = useStore(userSettingsStore);

    // Extract the necessary values from user settings (budget limits, category limits, alerts status).
    const { totalBudgetLimit, categoryLimits, alertsEnabled } = userSettings;

    // If alerts are disabled in the settings, return null to avoid rendering the component.
    if (!alertsEnabled) return null;

    // Calculate the total expenses from the transaction data.
    const totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0); // Assuming transaction has an 'amount' field

    // Check if the total expenses exceed the total budget limit.
    const overTotalBudget = totalExpenses > totalBudgetLimit;

    // Calculate expenses per category and check if any category limit has been exceeded.
    const expensesPerCategory = transactions.reduce((acc, transaction) => {
        const category = transaction.category; // Assuming transaction has a 'category' field
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
    }, {});

    const exceededCategories = Object.entries(expensesPerCategory)
        .filter(([category, expense]) => expense > (categoryLimits[category] || 0))
        .map(([category]) => category);

    return (
        <div>
            {/* Total limit alert */}
            <Collapse in={overTotalBudget}>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    You have exceeded your total budget limit of {totalBudgetLimit} €!
                </Alert>
            </Collapse>

            {/* Alerts by category */}
            {exceededCategories.map((category) => (
                <Alert severity="warning" sx={{ mb: 2 }} key={category}>
                    You have exceeded your budget limit for {category} ({categoryLimits[category]} €)!
                </Alert>
            ))}
        </div>
    );
}

export default AlertBanner;
