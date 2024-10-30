import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody , Paper} from '@mui/material';

function RecentTransactions() {
    const transactions = useStore(transactionsStore) || []; // Provide a default empty array

    // Check if transactions is an array before sorting
    const sortedTransactions = Array.isArray(transactions) 
        ? [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, latest first
        : [];

    return (
        <div>
        <h3>Recent Transactions</h3>
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount (€)</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedTransactions.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>


    );
}

export default RecentTransactions;
