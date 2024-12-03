import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Clear any previous error messages
    setError('');

    // Check if both fields are filled
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Prepare login data to send
      const loginData = { email, password };

      // Send login data to the backend
      const response = await fetch('http://localhost/WebTech/CityWatch/PHP/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure the backend understands it's JSON
        },
        body: JSON.stringify(loginData),  // Send email and password as JSON
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      // Parse the response from the backend
      const data = await response.json();

      // Handle success or failure from the backend
      if (data.success) {
        navigate('/map');  // Redirect to map page if login is successful
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('There was an error with the request. Please try again later.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box className="welcome-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="welcome-logo" />
      <Typography variant="h4" className="citywatch-title">CITYWATCH</Typography>
      <Typography variant="body1" className="welcome-title">Welcome back! Please enter your details.</Typography>

      {/* Display error message if there is one */}
      {error && <Typography variant="body2" color="error" className="error-message">{error}</Typography>}

      <Box sx={{ width: '100%', marginTop: '16px' }}>
        <Typography variant="body2" className="text-field-label">Email</Typography>
        <TextInputBox
          text="Enter your email"
          fullWidth
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Box className="checkbox-link-container">
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
          label="Remember for 30 days"
        />
        <Link href="/forgot-password" sx={{ fontSize: '0.875rem' }}>Forgot password</Link>
      </Box>

      <StyledButton text="Sign in" onClick={handleLogin} fullWidth className="signin-button" />

      <Typography variant="body2" className="or-text">or</Typography>

      <StyledButton text="Register" onClick={handleRegister} fullWidth className="register-button" />
    </Box>
  );
};

export default LoginPage;
