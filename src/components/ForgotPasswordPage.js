import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function ForgotPasswordPage() {
    const [email, setEmail] = useState(''); 
    const [message, setMessage] = useState(''); 

   
         

        // Simulate sending a password recovery email.
       
            // Display an error message with the default credentials.
            setMessage(
                       'Default credentials:\n' +
                       'Email: default@example.com\n' +
                       'Password: password123');
        
    

    return (
        <Box sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            
            {message && (
                <Typography color="secondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
}

export default ForgotPasswordPage;
