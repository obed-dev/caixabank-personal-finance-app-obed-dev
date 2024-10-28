import React, { useState, useEffect, Profiler, Suspense } from 'react';
import { Box, Typography, CircularProgress, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField, Button } from '@mui/material';
import { onRenderCallback } from '../utils/onRenderCallback';

function SupportPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Implement the effect to get user data from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users by search term
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Display loading spinner
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Profiler id="SupportPage" onRender={onRenderCallback}>
            <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
                <Typography variant="h4" gutterBottom color="primary">
                    Support Contacts
                </Typography>

                {/* Search bar */}
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ mb: 4 }}
                />

                {/* Support contact list */}
                <Suspense fallback={<CircularProgress />}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <List>
                            {filteredUsers.map((user) => (
                                <ListItem key={user.id} sx={{ mb: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar>{user.name.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${user.name} (${user.email})`}
                                        secondary={`Phone: ${user.phone} | Company: ${user.company.name}`}
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        href={`mailto:${user.email}`}
                                        sx={{ marginLeft: 2 }}
                                    >
                                        Contact
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Suspense>
            </Box>
        </Profiler>
    );
}

export default SupportPage;
