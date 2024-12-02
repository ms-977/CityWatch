import React from 'react';
import { Box, Typography, Link, MenuItem, Select } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState('');

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

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
          <Typography variant="body2" className="text-field-label">State</Typography>
          <Select
            value={state}
            onChange={handleStateChange}
            displayEmpty
            fullWidth
            className="state-dropdown"
          >
            <MenuItem value="" disabled>Select your state</MenuItem>
            <MenuItem value="AL">Alabama</MenuItem>
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
          </Select>
        </Box>

        <Box className="text-field-container">
          <Typography variant="body2" className="text-field-label">Zip Code</Typography>
          <TextInputBox text="Zip Code" fullWidth />
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
