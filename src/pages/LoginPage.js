import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLogin = async () => {
    try {
      console.log('Logging in with:', { email, password });

      const response = await axios.post(
        'http://localhost/Citywatch/CityWatch-Backend/login.php',
        { email: email, password: password }
      );

      console.log('Backend Response:', response.data);

      if (response.data.success && response.data.user) {
        const user = response.data.user;

        // Save details to localStorage
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('username', user.name || 'Guest');
        localStorage.setItem('usertype', user.usertype);

        handleSnackbar('Login successful! Redirecting...', 'success');

        // Navigate based on the user type
        setTimeout(() => {
          if (user.usertype === 'admin') {
            console.log('Redirecting to Admin Layout');
            navigate('/admin/all-reports');
          } else if (user.usertype === 'User') {
            console.log('Redirecting to User Layout');
            navigate('/user/map');
          } else {
            console.error('Invalid user type:', user.usertype);
            handleSnackbar('Invalid user type detected.', 'error');
          }
        }, 1500); // Delay to let Snackbar display
      } else {
        console.error('Login failed:', response.data.message);
        handleSnackbar(response.data.message || 'Login failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      handleSnackbar('An error occurred while logging in. Please try again later.', 'error');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="welcome-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="welcome-logo" />

      <Typography variant="h4" className="citywatch-title">
        CITYWATCH
      </Typography>

      <Typography variant="body1" className="welcome-title">
        Welcome back! Please enter your details.
      </Typography>

      <Box sx={{ width: '100%', marginTop: '16px' }}>
        <Typography variant="body2" className="text-field-label">Email</Typography>
        <TextInputBox
          text="Enter your email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box sx={{ width: '100%', marginTop: '8px' }}>
        <Typography variant="body2" className="text-field-label">Password</Typography>
        <TextInputBox
          text="••••••••"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Box className="checkbox-link-container">
        <FormControlLabel control={<Checkbox />} label="Remember for 30 days" />
        <Link href="/forgot-password" sx={{ fontSize: '0.875rem' }}>Forgot password</Link>
      </Box>

      <StyledButton
        text="Sign in"
        onClick={handleLogin}
        fullWidth
        className="signin-button"
      />

      <Typography variant="body2" className="or-text">or</Typography>

      <StyledButton
        text="Register"
        onClick={handleRegister}
        fullWidth
        className="register-button"
      />

      {/* Snackbar Alert */}
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

export default LoginPage;
