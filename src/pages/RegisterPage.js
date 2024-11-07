import React from 'react';
import { Box, Typography, Link, MenuItem, Select } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/RegisterPage.css';


const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Add sign-up logic here
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Box className="register-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="register-logo" />

      <Typography variant="h4" className="citywatch-title">
        CITYWATCH
      </Typography>

      <Typography variant="h5" className="register-title">
        Get Started Now
      </Typography>

      <Typography variant="body1" className="subtitle">
        Enter your Credentials to Create your account
      </Typography>

      <Box className="input-container">
        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Name</Typography>
          <TextInputBox text="Name" fullWidth />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Email address</Typography>
          <TextInputBox text="xyz@xyz.com" fullWidth />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Password</Typography>
          <TextInputBox text="Password" type="password" fullWidth />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Confirm Password</Typography>
          <TextInputBox text="Password" type="password" fullWidth />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Phone no.</Typography>
          <TextInputBox text="123-456-7890" fullWidth />
        </Box>
      </Box>

      <StyledButton text="Sign up" onClick={handleSignUp} fullWidth className="signup-button" />

      <Typography variant="body2" className="signin-link">
        Have an account? <Link href="#" onClick={handleSignIn}>Sign In</Link>
      </Typography>
    </Box>
  );
};


export default RegisterPage;
