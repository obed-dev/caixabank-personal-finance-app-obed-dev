import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore, login } from '../stores/authStore';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false); // New state for showing credentials

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Debe ser la primera línea para prevenir el comportamiento predeterminado
   
    

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

    const handleForgotPassword = () => {

        setShowCredentials(true); // Show credentials message
    };
    
    const handleRegister = () => {
        // Aquí puedes manejar el registro o redirigir a una página de registro
        navigate('/register');
        // Por ejemplo, puedes usar navigate('/register') si tienes una página de registro
    }; 

    const handleLoginForgot = () => { 
        if( email === 'default@example.com ' && password === 'password123'  ) { 
            navigate('/dashboard');
        }
    }

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
                    onClick={handleLoginForgot()}
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
                    Sign in {email} <br />
                    successfully! Redirecting...
                </Alert>
            )}

            {error && (
                <>
                    <Button
                        onClick={handleForgotPassword} // Corregido para pasar la referencia
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Forgot Password?
                    </Button>
                    <Button
                        onClick={handleRegister} // Corregido para pasar la referencia
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                </>
            )}

            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    Default credentials:<br />
                    Email: default@example.com<br />
                    Password: password123
                </Alert>
            )}
        </Box>
    );
}

export default LoginPage;
