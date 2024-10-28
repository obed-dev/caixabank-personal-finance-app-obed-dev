import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography
} from '@mui/material';

function TransactionList() {
    const transactions = useStore(transactionsStore);

    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Implement delete functionality
    // Instructions:
    // - Implement the logic to delete a transaction by its ID.
    // - Make sure the transactions state/store is updated after deletion.
    const deleteTransaction = useCallback((id) => {
        // Implement functionality to delete a transaction
    }, [transactions]);

    // Implement edit functionality
    // Instructions:
    // - Implement logic to edit a transaction.
    // - Ensure the updated transaction is saved in the store.
    const handleEdit = useCallback((transaction) => {
        // Implement functionality to edit a transaction
    }, []);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Transaction List
            </Typography>

            {/* Add transaction */}
            {/* Instructions:
                - Implement the logic to open a form for adding a new transaction.
                - Trigger the form/modal through the onClick event. */}
            <Button variant="contained" color="primary" onClick={() => {/* Implement functionality to add transaction */ }}>
                Add Transaction
            </Button>

            {/* Filters */}
            {/* Instructions:
                - Implement category and type filters using Material UI's `Select` component.
                - Update the filterCategory and filterType state values when the user makes a selection.
                - Apply the selected filters to the displayed transactions. */}
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-category-label">Category</InputLabel>
                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {/* Add additional categories dynamically */}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-type-label">Type</InputLabel>
                    <Select
                        labelId="filter-type-label"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-field-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-field-label"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Table of transactions */}
            {/* Instructions:
                - Render the transactions in a table format using Material UI's `Table` component.
                - For each transaction, display the following details: description, amount, type, category, and date.
                - Implement the action buttons (Edit, Delete) within each row for managing transactions. */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Map over the transactions and render each transaction as a row.
                            - For each row, add logic for Edit and Delete actions.
                            - Display the transaction data in the respective table cells. */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TransactionList;
