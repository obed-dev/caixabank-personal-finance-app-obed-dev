import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import ExportButton from './ExportButton'; 
import DownloadProfilerData from './DownloadProfilerData';
import { transactionsStore, deleteTransaction as deleteTransactionAction } from '../stores/transactionStore'; 
import TransactionForm from './TransactionForm';
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
    const [showForm, setShowForm] = useState(false);
    const [profilerData, setProfilerData] = useState([]);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState(null);
    

    // Implement delete functionality
    const deleteTransaction = useCallback((id) => {
        const isConfirmed = window.confirm('Are you sure do you want to delete this')

        if (isConfirmed) {
            deleteTransactionAction(id); // Ensure this function is defined in your transaction store
        }
            
    }, []);

    // Implement edit functionality
    const handleEdit = useCallback((transaction) => {
        setTransactionToEdit(transaction);
        setIsFormOpen(true);
    }, []);

    
    const handleTransactionAdded = () => {
        setShowForm(false);
    };
    


    // Filter transactions based on category and type
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const matchesCategory = filterCategory ? transaction.category === filterCategory : true;
            const matchesType = filterType ? transaction.type === filterType : true;
            return matchesCategory && matchesType;
        });
    }, [transactions, filterCategory, filterType]);

    // Sort transactions
    const sortedTransactions = useMemo(() => {
        if (sortField) {
            return [...filteredTransactions].sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
        }
        return filteredTransactions;
    }, [filteredTransactions, sortField]);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Transaction List
            </Typography>

           
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
                Add Transaction
            </Button>

            
            {showForm && (
                <TransactionForm onClose={() => setShowForm(false)} onTransactionAdded={handleTransactionAdded} />
            )}

           
            {transactions.length > 0 && (
                <ExportButton
                    data={transactions}
                    filename="transactions.csv"
                    headers={['description', 'amount', 'type', 'category', 'date']}
                    label="Export Transactions"
                />
            )}
                        {profilerData.length > 0 && (
                <DownloadProfilerData profilerData={profilerData} />
            )}
            
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-category-label">Category</InputLabel>
                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                      
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
                        {sortedTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(transaction)}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={() => deleteTransaction(transaction.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Transaction Form Dialog */}
            {isFormOpen && (
                <TransactionForm transactionToEdit={transactionToEdit} onClose={() => setIsFormOpen(false)} />
            )}
        </Box>
    );
}

export default TransactionList;
