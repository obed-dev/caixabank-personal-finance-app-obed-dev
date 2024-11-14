import React, { useState } from 'react';
import {
    AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Typography, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useStore } from '@nanostores/react';
import { authStore, logout } from '../stores/authStore';
import { Link, useNavigate } from 'react-router-dom';
import CaixaBankLogo from '../assets/caixabank-icon.png';

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:800px)');  // Trigger at 800px
    const auth = useStore(authStore);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 2 }}>
                    {/* Logo and Burger Menu Icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isMobile && (
                            <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <img src={CaixaBankLogo} alt="CaixaBank Logo" style={{ width: 32, height: 32, marginRight: 8 }} />
                        <Typography variant="h6" noWrap>
                            CaixaBank
                        </Typography>
                    </Box>

                    {/* Inline Links for Non-Mobile View */}
                    {!isMobile && auth.isAuthenticated && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexGrow: 1, justifyContent: 'flex-end' }}>
                            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                            <Link to="/transactions" style={{ textDecoration: 'none', color: 'inherit' }}>Transactions</Link>
                            <Link to="/analysis" style={{ textDecoration: 'none', color: 'inherit' }}>Analysis</Link>
                            <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>Settings</Link>
                            <Link to="/support" style={{ textDecoration: 'none', color: 'inherit' }}>Support</Link>
                        </Box>
                    )}

                    {/* Theme Toggle, Notifications, and Sign Out */}
                    {auth.isAuthenticated && (
                        <Box sx={{ display: 'flex', alignItems: 'center'  }}>
                            <IconButton color="inherit" onClick={toggleTheme}>
                                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                            <IconButton color="inherit">
                                <Badge color="error" variant="dot">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2 }}>
                                Sign Out
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile View */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{ width: 250, backgroundColor: 'background.paper' }}>
                    <Box sx={{ padding: 2 }}>
                        {auth.isAuthenticated ? (
                            <>
                                <Link to="/dashboard" style={{ display: 'block', textDecoration: 'none', margin: '20px 0', color: 'inherit' }}>
                                    <Typography sx={{ color: 'text.primary' }}>Home</Typography>
                                </Link>
                                <Link to="/transactions" style={{ display: 'block', textDecoration: 'none', margin: '20px 0', color: 'inherit' }}>
                                    <Typography sx={{ color: 'text.primary' }}>Transactions</Typography>
                                </Link>
                                <Link to="/analysis" style={{ display: 'block', textDecoration: 'none', margin: '20px 0', color: 'inherit' }}>
                                    <Typography sx={{ color: 'text.primary' }}>Analysis</Typography>
                                </Link>
                                <Link to="/settings" style={{ display: 'block', textDecoration: 'none', margin: '20px 0', color: 'inherit' }}>
                                    <Typography sx={{ color: 'text.primary' }}>Settings</Typography>
                                </Link>
                                <Link to="/support" style={{ display: 'block', textDecoration: 'none', margin: '20px 0', color: 'inherit' }}>
                                    <Typography sx={{ color: 'text.primary' }}>Support</Typography>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ display: 'block', textDecoration: 'none', margin: '10px 0', color: 'inherit' }}>
                                    <Typography sx={{ color: 'text.primary' }}>Login</Typography>
                                </Link>
                                <Link to="/register" style={{ display: 'block', textDecoration: 'none', margin: '10px 0', color: 'inherit' }}>
                                    <Typography sx={{ color: 'text.primary' }}>Register</Typography>
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
