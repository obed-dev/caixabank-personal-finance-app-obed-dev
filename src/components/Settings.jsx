import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';

import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
} from '@mui/material';
import { expenseCategories } from '../constants/categories';


function Settings() {
    const userSettings = useStore(userSettingsStore);
    

    const [alertsEnabled, setAlertsEnabled] = useState(userSettings.alertsEnabled);
    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);
    const [categoryLimits, setCategoryLimits] = useState({});

    // Initialize category limits based on expense categories
    useEffect(() => {
        const initialLimits = expenseCategories.reduce((acc, category) => {
            acc[category] = userSettings.categoryLimits[category] || 0;
            return acc;
        }, {});
        setCategoryLimits(initialLimits);
    }, [userSettings]);

    const handleSave = () => {
        const totalCategoryLimits = Object.values(categoryLimits).reduce((sum, limit) => sum + limit, 0);

        if (totalCategoryLimits > totalBudgetLimit) {
            setError('Total category limits exceed the total budget limit.');
            setBudgetExceeded(true);
            return;
        } else {
            setError('');
            setBudgetExceeded(false);
        }

        // Save settings to store
        userSettingsStore.set({ ...userSettings, totalBudgetLimit, alertsEnabled, categoryLimits });
        setSuccessMessage('Settings saved successfully!');
    };

    const handleCategoryLimitChange = (category, value) => {
        setCategoryLimits((prev) => ({
            ...prev,
            [category]: value < 0 ? 0 : value // Prevent negative values
        }));
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Settings
            </Typography>

            <FormControlLabel
                control={<Switch color="primary" checked={alertsEnabled} onChange={() => setAlertsEnabled(!alertsEnabled)} />}
                label="Enable Alerts"
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>
                <TextField
                    type="number"
                    name="totalBudgetLimit"
                    fullWidth
                    margin="normal"
                    value={totalBudgetLimit}
                    onChange={(e) => setTotalBudgetLimit(parseFloat(e.target.value) || 0)}
                    inputProps={{ min: 0, step: '0.01' }}
                    sx={{ mt: 1 }}
                />
            </Paper>

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Category Budget Limits (€)</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {expenseCategories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} key={category}>
                            <TextField
                                label={category}
                                type="number"
                                fullWidth
                                margin="normal"
                                value={categoryLimits[category] || 0}
                                onChange={(e) => handleCategoryLimitChange(category, parseFloat(e.target.value) || 0)}
                                inputProps={{ min: 0, step: '0.01' }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Box>

            {budgetExceeded && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    You have exceeded your budget limit of {totalBudgetLimit} €!
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}

export default Settings;
