import React, { useState } from 'react';
import { Box, Typography, Link, Snackbar, Alert } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/ForgotPassword.css';
const API_BASE_URL = "https://citywatch-services-5b54bb1f3d47.herokuapp.com/";

const UpdatePasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(''); // Add email if needed for reset
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  const navigate = useNavigate();

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      handleSnackbar("Both password fields are required.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      handleSnackbar("Passwords do not match.", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/resetPassword.php`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // Replace with actual email if required
          newPassword,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        handleSnackbar(result.message, "success");
        navigate('/login');
      } else {
        handleSnackbar(result.message, "error");
      }
    } catch (error) {
      handleSnackbar("An error occurred. Please try again later.", "error");
      console.error("Password update failed:", error);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="forgot-password-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="forgot-password-logo" />

      <Typography variant="h4" className="citywatch-title">CITYWATCH</Typography>
      <Typography variant="h5" className="forgot-password-title">Change Password</Typography>
      <Typography variant="body1" className="subtitle">Enter your new password</Typography>

      <Box className="input-container">
        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">New Password</Typography>
          <TextInputBox 
            text="New Password" 
            type="password" 
            fullWidth 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Confirm Password</Typography>
          <TextInputBox 
            text="Confirm Password" 
            type="password" 
            fullWidth 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </Box>
      </Box>

      <StyledButton 
        text="Update password" 
        onClick={handlePasswordChange} 
        fullWidth 
        className="update-password-button" 
      />

      <Typography variant="body2" className="signin-link">
        Have an account? <Link href="#" onClick={handleSignIn}>Sign In</Link>
      </Typography>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdatePasswordPage;
