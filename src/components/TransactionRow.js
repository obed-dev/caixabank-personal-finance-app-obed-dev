import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function TransactionRow({ transaction, onEdit, onDelete }) {
    const handleEdit = () => {
        onEdit(transaction); // Llama a la función onEdit con la transacción actual
    };

    const handleDelete = () => {
        // Llama a la función onDelete con la ID de la transacción actual
        const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
        if (confirmDelete) {
            onDelete(transaction.id);
        }
    };

    return (
        <TableRow key={transaction.id}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type === 'income' ? 'Income' : 'Expense'}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString('en-US')}</TableCell>
            <TableCell>
                <Button onClick={handleEdit} variant="contained" color="primary">
                    Edit
                </Button>
                <Button onClick={handleDelete} variant="contained" color="secondary">
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default TransactionRow;
