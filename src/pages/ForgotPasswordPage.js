import React, { useState } from 'react';
import { Box, Typography, Link, Snackbar, Alert } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/ForgotPassword.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePasswordChange = async () => {
    if (!email) {
      handleSnackbar('Please enter your email address.', 'warning');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost/Citywatch/CityWatch-Backend/Forgot-Password.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (result.success) {
        handleSnackbar('Password reset link sent successfully!', 'success');
      } else {
        handleSnackbar(result.message || 'Failed to send reset link.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      handleSnackbar('An unexpected error occurred.', 'error');
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Box className="forgot-password-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="forgot-password-logo" />

      <Typography variant="h4" className="citywatch-title">
        CITYWATCH
      </Typography>

      <Typography variant="h5" className="forgot-password-title">
        Update Password
      </Typography>

      <Typography variant="body1" className="subtitle">
        Enter your Credentials
      </Typography>

      <Box className="input-container">
        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Email address</Typography>
          <TextInputBox
            text="Enter your email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Box>

      <StyledButton
        text="Send link to my email"
        onClick={handlePasswordChange}
        fullWidth
        className="update-password-button"
      />

      <Typography variant="body2" className="signin-link">
        Have an account?{' '}
        <Link href="#" onClick={handleSignIn}>
          Sign In
        </Link>
      </Typography>

      {/* Snackbar Alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPasswordPage;
