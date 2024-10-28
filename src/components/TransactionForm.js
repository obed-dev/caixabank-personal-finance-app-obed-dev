import React, { useState, useEffect } from 'react';
import { addTransaction, editTransaction } from '../stores/transactionStore';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    Box,
} from '@mui/material';

const TransactionForm = ({ transactionToEdit, onSave }) => {
    const [transaction, setTransaction] = useState(transactionToEdit || { description: '', amount: 0 });

    useEffect(() => {
        if (transactionToEdit) setTransaction(transactionToEdit);
    }, [transactionToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (transaction.id) {
            editTransaction(transaction);
        } else {
            addTransaction({ ...transaction, id: Date.now() });
        }
        onSave();
    };

    return (
        <Dialog open={true} onClose={onSave}>
            <DialogTitle>{transaction.id ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                name="description"
                                value={transaction.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Amount"
                                variant="outlined"
                                type="number"
                                fullWidth
                                name="amount"
                                value={transaction.amount}
                                onChange={handleChange}
                                required
                                inputProps={{ min: 0, step: '0.01' }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: 2 }}>
                        <Button onClick={onSave} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {transaction.id ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TransactionForm;
