import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';

const MapPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Use full viewport height
      }}
    >
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Navbar />
        <Box sx={{ flex: 1, padding: 2 }}>
          {/* Main content goes here */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MapPage;
