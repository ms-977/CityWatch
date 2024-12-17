import React, { useState } from 'react';
import {
  Box,
  Typography,
  Link,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/CityWatch.png';
import './styles/RegisterPage.css';
const API_BASE_URL = "https://citywatch-services-5b54bb1f3d47.herokuapp.com/";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      handleSnackbar("Passwords do not match!", "error");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/register.php`,
        {
          name,
          email,
          password,
          state,
          zipcode,
        }
      );

      console.log("Server Response:", response.data);

      if (response.data.success) {
        handleSnackbar("Registration successful! Redirecting...", "success");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        handleSnackbar(response.data.message || "Registration failed.", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      handleSnackbar("An error occurred while registering. Please try again.", "error");
    }
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
          <TextInputBox
            text="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Email address</Typography>
          <TextInputBox
            text="xyz@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Password</Typography>
          <TextInputBox
            text="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Confirm Password</Typography>
          <TextInputBox
            text="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">State</Typography>
          <Select
            value={state}
            onChange={(e) => setState(e.target.value)}
            displayEmpty
            fullWidth
            className="state-dropdown"
          >
            <MenuItem value="" disabled>Select your state</MenuItem>
            {/* List of States */}
            {[
              "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
              "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
              "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
              "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
              "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
            ].map((code) => (
              <MenuItem key={code} value={code}>{code}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Zip Code</Typography>
          <TextInputBox
            text="Zip Code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            fullWidth
          />
        </Box>
      </Box>

      <StyledButton text="Sign up" onClick={handleSignUp} fullWidth className="signup-button" />

      <Typography variant="body2" className="signin-link">
        Have an account? <Link href="#" onClick={handleSignIn}>Sign In</Link>
      </Typography>

      {/* Snackbar Alerts */}
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

export default RegisterPage;
