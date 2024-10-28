import React from 'react';
import { transactionsStore, deleteTransaction } from '../stores/transactionStore';
import { useStore } from '@nanostores/react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionList = ({ onEdit }) => {
    const transactions = useStore(transactionsStore);

    return (
        <Paper elevation={3} sx={{ padding: 2, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h6" align="center" gutterBottom>
                Transaction List
            </Typography>
            <List>
                {transactions.map((transaction) => (
                    <ListItem key={transaction.id} divider>
                        <ListItemText
                            primary={transaction.description}
                            secondary={`Amount: $${transaction.amount}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => onEdit(transaction)}
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteTransaction(transaction.id)}
                            >
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TransactionList;
