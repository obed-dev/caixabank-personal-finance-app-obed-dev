import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Avatar, Typography, useMediaQuery  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useStore } from '@nanostores/react';
import { authStore, logout } from '../stores/authStore';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)'); // Check if device is mobile

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const auth = useStore(authStore);
    

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
     
    

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {isMobile && (
                        <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                        {!auth.isAuthenticated ? (
                            <>
                                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                    Login
                                </Link>
                                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {!isMobile && (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                            Home
                                        </Link>
                                        <Link to="/transactions" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                            Transactions
                                        </Link>
                                        <Link to="/analysis" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                            Analysis
                                        </Link>
                                        <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                            Settings
                                        </Link>
                                        <Link to="/support" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
                                            Support
                                        </Link>
                                    </Box>
                                )}

                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                                    <IconButton color="inherit">
                                        <Badge color="error" variant="dot">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                    
                                    
                                 
            
                             {/* Display the user's email */}
                          
                                    <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2 }}>
                                        Sign Out
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Burger menu for mobile view */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{ width: 250 }}>
                    <Box sx={{ padding: 2 }}>
                      
                        {!auth.isAuthenticated ? (
                            <>
                                <Link to="/login" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                    Login
                                </Link>
                                <Link to="/register" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                    Home
                                </Link>
                                <Link to="/transactions" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                    Transactions
                                </Link>
                                <Link to="/analysis" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                    Analysis
                                </Link>
                                <Link to="/settings" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                    Settings
                                </Link>
                                <Link to="/support" style={{ display: 'block', textDecoration: 'none', margin: '8px 0' }}>
                                    Support
                                </Link>
                                
                            </>
                        )}
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
