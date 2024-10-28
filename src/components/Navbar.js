import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Typography, useMediaQuery } from '@mui/material';
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
    const isMobile = useMediaQuery('(max-width:600px)'); 
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
                <Toolbar>
                    {isMobile && (
                        <>
                            <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                                <img src={CaixaBankLogo} alt="CaixaBank Logo" style={{ width: 32, height: 32, marginRight: 8 }} /> 
                                <Typography variant="h6">CaixaBank</Typography>
                            </Box>
                        </>
                    )}

                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                            <img src={CaixaBankLogo} alt="CaixaBank Logo" style={{ width: 32, height: 32, marginRight: 8 }} /> 
                            <Typography variant="h6">CaixaBank</Typography>
                        </Box>
                    )}

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                    {auth.isAuthenticated ? (  // Mostrar solo si el usuario está autenticado
        !isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1  }}>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', marginRight: 16 }}>
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
        )
    ) : null} 
                            
                            {auth.isAuthenticated && (
                       <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
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

                    </Box>
                </Toolbar>
            </AppBar>

            {/* Burger menu for mobile view */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{ width: 250, backgroundColor: 'background.paper' }}>
        <Box sx={{ padding: 2 }}>
            {!auth.isAuthenticated ? (
                <>
                    <Link to="/login" style={{ display: 'block', textDecoration: 'none', margin: '8px 0', color: 'inherit' }}>
                        <Typography sx={{ color: 'text.primary' }}>Login</Typography>
                    </Link>
                    <Link to="/register" style={{ display: 'block', textDecoration: 'none', margin: '8px 0', color: 'inherit' }}>
                        <Typography sx={{ color: 'text.primary' }}>Register</Typography>
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/dashboard" style={{ display: 'block', textDecoration: 'none', margin: '8px 0', color: 'inherit' }}>
                        <Typography sx={{ color: 'text.primary' }}>Home</Typography>
                    </Link>
                    <Link to="/transactions" style={{ display: 'block', textDecoration: 'none', margin: '8px 0', color: 'inherit' }}>
                        <Typography sx={{ color: 'text.primary' }}>Transactions</Typography>
                    </Link>
                    <Link to="/analysis" style={{ display: 'block', textDecoration: 'none', margin: '8px 0', color: 'inherit' }}>
                        <Typography sx={{ color: 'text.primary' }}>Analysis</Typography>
                    </Link>
                    <Link to="/settings" style={{ display: 'block', textDecoration: 'none', margin: '8px 0', color: 'inherit' }}>
                        <Typography sx={{ color: 'text.primary' }}>Settings</Typography>
                    </Link>
                    <Link to="/support" style={{ display: 'block', textDecoration: 'none', margin: '8px 0', color: 'inherit' }}>
                        <Typography sx={{ color: 'text.primary' }}>Support</Typography>
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
