import React, { Profiler } from 'react';
import { useStore } from '@nanostores/react';
import { Box, Typography, Grid, Paper, Alert } from '@mui/material';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';
import { onRenderCallback } from '../utils/onRenderCallback';
import { transactionsStore } from '../stores/transactionStore';

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'));
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'));
const Statistics = React.lazy(() => import('./Statistics'));
const Recommendations = React.lazy(() => import('./Recommendations'));
const RecentTransactions = React.lazy(() => import('./RecentTransactions'));

function Dashboard() {
    const transactions = useStore(transactionsStore);

    // Calculate total income, total expenses, and balance
    const totalIncome = transactions.reduce((acc, transaction) => {
        return transaction.type === 'income' ? acc + transaction.amount : acc;
    }, 0);

    const totalExpense = transactions.reduce((acc, transaction) => {
        return transaction.type === 'expense' ? acc + transaction.amount : acc;
    }, 0);

    const balance = totalIncome - totalExpense;

    // Warning and budget limit logic (example values)
    const budgetLimit = 1000; // Set a budget limit
    const budgetExceeded = balance < 0 || totalExpense > budgetLimit;

    return (
        <Profiler id="Dashboard" onRender={onRenderCallback}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Dashboard
                </Typography>

                {/* Action Buttons Section */}
                <Box sx={{ mb: 4 }}>
                    <ExportButton />
                    <DownloadProfilerData />
                </Box>

                {/* Totals Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Income
                            </Typography>
                            <Typography variant="h5" data-testid="total-income">
                                {totalIncome.toFixed(2)} {/* Show total income */}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h5" data-testid="total-expenses">
                                {totalExpense.toFixed(2)} {/* Show total expenses */}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Balance
                            </Typography>
                            <Typography variant="h5" data-testid="balance">
                                {balance.toFixed(2)} {/* Show the balance */}
                            </Typography>
                            {balance < 0 && (
                                <Alert severity="warning">Your balance is negative!</Alert>
                            )}
                            {budgetExceeded && (
                                <Alert severity="error">Budget limit exceeded!</Alert>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                {/* Statistics and Recommendations Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading statistics...</div>}>
                            <Statistics />
                        </React.Suspense>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <React.Suspense fallback={<div>Loading recommendations...</div>}>
                            <Recommendations />
                        </React.Suspense>
                    </Grid>
                </Grid>

                {/* Charts Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <React.Suspense fallback={<div>Loading analysis graph...</div>}>
                            <AnalysisGraph />
                        </React.Suspense>
                    </Grid>
                    <Grid item xs={12}>
                        <React.Suspense fallback={<div>Loading balance over time...</div>}>
                            <BalanceOverTime />
                        </React.Suspense>
                    </Grid>
                </Grid>

                {/* Recent Transactions Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <React.Suspense fallback={<div>Loading recent transactions...</div>}>
                            <RecentTransactions />
                        </React.Suspense>
                    </Grid>
                </Grid>
            </Box>
        </Profiler>
    );
}

export default Dashboard;
