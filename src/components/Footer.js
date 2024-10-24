import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer">
            {/* Search bar */}
            <Box>
                <Paper component="form">
                    <IconButton aria-label="search">
                        {/* Add the search icon here */}
                    </IconButton>
                    <InputBase placeholder="Find your branch..." />
                    <Button type="submit">Search</Button>
                </Paper>
            </Box>

            <Typography>
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            {/* Social media icons */}
            {/* Instructions:
                - Add IconButtons for Facebook, Twitter, and Instagram.
                - Ensure each icon button links to the appropriate social media page.
                - Use the respective Material UI icons for Facebook, Twitter, and Instagram. */}
            <Box>
                {/* IconButton for Facebook */}
                {/* IconButton for Twitter */}
                {/* IconButton for Instagram */}
            </Box>
        </Box>
    );
};

export default Footer;
