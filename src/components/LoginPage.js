import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore, login } from '../stores/authStore';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useStore } from '@nanostores/react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Validación de campos
        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            login(storedUser);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                   Sign in {email} <br/>
                   successfully! Redirecting...
                </Alert>
            )}
        </Box>
    );
}

export default LoginPage;
