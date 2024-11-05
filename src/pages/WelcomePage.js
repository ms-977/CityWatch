import React from 'react';
import { Box, Typography } from '@mui/material';
import StyledButton from '../components/StyledButton';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box className="welcome-page">
      <Typography variant="h4" className="welcome-title">
        Welcome to
      </Typography>

      {/* Logo */}
      <Box component="img" src={logo} alt="CityWatch Logo" className="welcome-logo" />

      <Typography variant="h2" className="citywatch-title">
        CityWatch
      </Typography>
      
      <Typography variant="h6" className="subtitle">
        Your platform for reporting community issues
      </Typography>
      
      <Box className="button-container">
        <StyledButton text="Login" onClick={handleLogin} fullWidth />
        <StyledButton text="Register" onClick={handleRegister} fullWidth />
      </Box>
    </Box>
  );
};

export default WelcomePage;
