import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Avatar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleTheme, isDarkMode, user, onLogout }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    {/* Navigation links */}
                    <Box sx={{ flexGrow: 1 }}>
                        {user ? (
                            <Box sx={{ display: 'flex', alignItems: 'left' }}>
                                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                    Dashboard
                                </Link>
                                <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                    Settings
                                </Link>
                                <Button color="inherit" onClick={onLogout}>Logout</Button>
                                {/* User avatar */}
                                <IconButton>
                                    <Avatar alt={user.email} src={user.avatar} />
                                </IconButton>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: 20 }}>
                                    Login
                                </Link>
                                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Register
                                </Link>
                            </Box>
                        )}
                        <IconButton>
                            <Badge color="error" variant="dot">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    {/* Drawer navigation links */}
                    {user ? (
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h6">Navigation</Typography>
                            <Link to="/dashboard" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                Dashboard
                            </Link>
                            <Link to="/transactions" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                Transactions
                            </Link>
                            <Link to="/settings" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                Settings
                            </Link>
                        </Box>
                    ) : (
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h6">Navigation</Typography>
                            <Link to="/login" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                Login
                            </Link>
                            <Link to="/register" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                Register
                            </Link>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
