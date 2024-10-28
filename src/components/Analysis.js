import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import ExportButton from './ExportButton'; // Import the refactored ExportButton

function Analysis() {
    const transactions = useStore(transactionsStore);

    const [timeFrame, setTimeFrame] = useState('monthly');
    const [reportType, setReportType] = useState('trend');

    // Prepare the data for the trend analysis report based on the selected time frame
    const [trendData, setTrendData] = useState([]);
    const [budgetData, setBudgetData] = useState([]);

    // Use effect to calculate the trend data and budget data whenever transactions change
    useEffect(() => {
        // Calculate trend data
        const groupedData = {};

        transactions.forEach((transaction) => {
            const date = new Date(transaction.date);
            let key;

            // Grouping logic based on time frame
            if (timeFrame === 'daily') {
                key = date.toLocaleDateString(); // e.g., "10/27/2024"
            } else if (timeFrame === 'weekly') {
                const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;
                key = week;
            } else if (timeFrame === 'monthly') {
                key = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2024-10"
            } else if (timeFrame === 'yearly') {
                key = date.getFullYear(); // e.g., "2024"
            }

            if (!groupedData[key]) {
                groupedData[key] = { key, income: 0, expense: 0 };
            }

            // Accumulate income and expense amounts
            if (transaction.type === 'income') {
                groupedData[key].income += transaction.amount;
            } else if (transaction.type === 'expense') {
                groupedData[key].expense += transaction.amount;
            }
        });

        // Convert the grouped data to an array and sort it
        const dataArray = Object.values(groupedData).sort((a, b) => new Date(a.key) - new Date(b.key));
        setTrendData(dataArray);
        
        // Prepare budget vs actual data (Placeholder)
        setBudgetData([{ key: 'Budget', budget: 500, actual: 400 }]); // Replace with actual budget data logic
    }, [transactions, timeFrame]);

    // Helper function to get the week number
    const getWeekNumber = (d) => {
        const oneJan = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Advanced Analysis
            </Typography>

            {/* Display No Transactions Message */}
            {transactions.length === 0 && (
                <Typography variant="h6" color="text.secondary">
                    No transactions available.
                </Typography>
            )}

            {/* Controls */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
                        <Select
                            labelId="timeframe-select-label"
                            id="timeframe-select"
                            label="Time Frame"
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)} // Update time frame state
                        >
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="report-type-select-label">Report Type</InputLabel>
                        <Select
                            labelId="report-type-select-label"
                            id="report-type-select"
                            label="Report Type"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)} // Update report type state
                        >
                            <MenuItem value="trend">Trend Analysis</MenuItem>
                            <MenuItem value="budget">Budget vs. Actual</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Export Button */}
                <Grid item xs={12} sm={6} md={4}>
                    <ExportButton
                        data={reportType === 'trend' ? trendData : budgetData} // Dynamic data based on selected report type
                        filename={`report_${reportType}_${new Date().toISOString()}.csv`}
                        headers={reportType === 'trend' ? ['Date', 'Income', 'Expense'] : ['Key', 'Budget', 'Actual']} // Dynamic headers
                    />
                </Grid>
            </Grid>

            {/* Render the trend analysis chart if 'trend' is selected */}
            {reportType === 'trend' && (
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Income and Expenses Trend
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={trendData}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#28B463" name="Income" />
                                    <Line type="monotone" dataKey="expense" stroke="#E74C3C" name="Expenses" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Render the budget vs actual expenses chart if 'budget' is selected */}
            {reportType === 'budget' && (
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                Budget vs Actual Expenses
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={budgetData}>
                                    <XAxis dataKey="key" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
                                    <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Additional Analysis Sections */}
            <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Savings Goals
                        </Typography>
                        <Typography>No savings goals set.</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom color="text.secondary">
                            Net Worth Over Time
                        </Typography>
                        <Typography>No net worth data available.</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Analysis;
