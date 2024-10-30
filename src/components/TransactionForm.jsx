import React, { useState, useEffect } from 'react';
import {addTransaction, editTransaction } from '../stores/transactionStore';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    Box,
} from '@mui/material';
import { categoryKeywords } from '../constants/categoryKeywords';
import { allCategories } from '../constants/categories';

function TransactionForm({ transactionToEdit, onClose }) {
    

    // Local state variables
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Implement the function to assign a category based on description keywords
    const assignCategory = (desc) => {
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => desc.toLowerCase().includes(keyword))) {
                return category;
            }
        }
        return 'Other Expenses';
    };

    // Auto-assign a category if adding a new transaction
    useEffect(() => {
        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setDate(transactionToEdit.date);
        } else {
            const assignedCategory = assignCategory(description);
            setCategory(assignedCategory);
        }
    }, [transactionToEdit, description]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that all fields are filled in
        if (!description || !amount || !category) {
            alert('Please fill in all fields');
            return;
        }

        const transaction = {
            id: transactionToEdit ? transactionToEdit.id : Date.now(), // Use current timestamp as ID for new transactions
            description,
            amount: parseFloat(amount),
            type,
            category,
            date,
        };

        // Update or add the transaction
        if (transactionToEdit) {
            editTransaction(transaction);
        } else {
            addTransaction(transaction);
        }

        onClose(); // Close the dialog after submit
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                name="description"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Amount (€)"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                inputProps={{ min: 0, step: '0.01' }}
                                name="amount"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label="Type"
                                    name="type"
                                >
                                    <MenuItem value="income">Income</MenuItem>
                                    <MenuItem value="expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Category"
                                    name="category"
                                >
                                    {/* Render categories from allCategories */}
                                    {allCategories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: 2 }}>
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" data-testid="add-transaction-button">
                            {transactionToEdit ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default TransactionForm;
