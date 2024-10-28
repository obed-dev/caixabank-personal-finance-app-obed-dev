import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Importar el ícono de búsqueda
import FacebookIcon from '@mui/icons-material/Facebook'; // Importar el ícono de Facebook
import TwitterIcon from '@mui/icons-material/Twitter'; // Importar el ícono de Twitter
import InstagramIcon from '@mui/icons-material/Instagram'; // Importar el ícono de Instagram
import backgroundImage from '../assets/bgmaps.png'


const Footer = () => {
    return (
        <Box component="footer" sx={{
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Color de fondo con transparencia
            textAlign: 'center',
            backgroundImage: `url(${backgroundImage})`, // Ruta de la imagen de fondo
            backgroundSize: 'cover', // Asegura que la imagen cubra el área del pie de página
            backgroundPosition: 'center', // Centra la imagen
        }}>
            {/* Search bar */}
            <Box sx={{ marginBottom: 2 }}>
                <Paper component="form" onSubmit={(e) => e.preventDefault()}>
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase placeholder="Find your branch..." sx={{ flex: 1 }} />
                    <Button type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Paper>
            </Box>

            <Typography>
               Obed-Dev © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            {/* Social media icons */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                {/* IconButton for Facebook */}
                <IconButton
                    aria-label="Facebook"
                    component="a"
                    href="https://www.facebook.com" // Cambia a la URL de tu página de Facebook
                    target="_blank"
                >
                    <FacebookIcon />
                </IconButton>
                
                {/* IconButton for Twitter */}
                <IconButton
                    aria-label="Twitter"
                    component="a"
                    href="https://www.twitter.com" // Cambia a la URL de tu página de Twitter
                    target="_blank"
                >
                    <TwitterIcon />
                </IconButton>
                
                {/* IconButton for Instagram */}
                <IconButton
                    aria-label="Instagram"
                    component="a"
                    href="https://www.instagram.com" // Cambia a la URL de tu página de Instagram
                    target="_blank"
                >
                    <InstagramIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
