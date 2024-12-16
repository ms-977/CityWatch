// Import Statements
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, TextField, Typography, Paper, Divider, Container, Avatar, Button, Stack, Tabs, Tab, Snackbar, Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import './styles/SettingsPage.css';

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    state: '',
    zipcode: '',
    phoneNumber: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // "success", "error", "warning", "info"
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await axios.get(`http://localhost/Citywatch/CityWatch-Backend/get_user_data.php?user_id=${userId}`);
        if (response.data.success) {
          setUserData({
            name: response.data.user.name || '',
            email: response.data.user.email || '',
            state: response.data.address.state_name || '',
            zipcode: response.data.address.zipcode || '',
            phoneNumber: response.data.user.phone_number || ''
          });
        }
      } catch (error) {
        showSnackbar('Error fetching user data.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateAccount = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.post('http://localhost/Citywatch/CityWatch-Backend/update_user_data.php', {
        user_id: userId, ...userData
      });
      if (response.data.success) {
        showSnackbar('Account updated successfully!');
      } else {
        showSnackbar('Failed to update account.', 'error');
      }
    } catch (error) {
      showSnackbar('Error updating account.', 'error');
    }
  };

  const handlePasswordVerification = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.post('http://localhost/Citywatch/CityWatch-Backend/verify_password.php', {
        user_id: userId,
        currentPassword: passwordData.currentPassword
      });

      if (response.data.success) {
        setPasswordVerified(true);
        showSnackbar('Password verified. Please enter a new password.');
      } else {
        showSnackbar(response.data.message || 'Incorrect current password.', 'error');
      }
    } catch (error) {
      showSnackbar('Error verifying password.', 'error');
    }
  };

  const handlePasswordChange = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const response = await axios.post('http://localhost/Citywatch/CityWatch-Backend/change_password.php', {
        user_id: userId,
        newPassword: passwordData.newPassword
      });

      if (response.data.success) {
        showSnackbar('Your password has been changed successfully.');
        setPasswordVerified(false);
        setPasswordData({ currentPassword: '', newPassword: '' });
      } else {
        showSnackbar(response.data.message || 'Failed to change the password.', 'error');
      }
    } catch (error) {
      showSnackbar('Error changing password.', 'error');
    }
  };

  return (
    <Container maxWidth="md" className="settings-page">
      <Paper elevation={6} className="settings-content">
        <Stack direction="row" alignItems="center" spacing={3} className="avatar-section">
          <Avatar sx={{ width: 100, height: 100 }}>
            <AccountCircleIcon sx={{ fontSize: 80 }} />
          </Avatar>
          <Typography variant="h4" className="settings-title">Settings</Typography>
        </Stack>

        <Divider className="divider" />
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Account Details" icon={<SettingsIcon />} />
          <Tab label="Security" icon={<SecurityIcon />} />
        </Tabs>

        {activeTab === 0 && (
          <Box className="tab-content">
            <Typography variant="h5">Edit Account Information</Typography>
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              margin="normal"
              value={userData.phoneNumber}
              onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
            />
            <TextField
              label="State"
              fullWidth
              margin="normal"
              value={userData.state}
              onChange={(e) => setUserData({ ...userData, state: e.target.value })}
            />
            <TextField
              label="Zip Code"
              fullWidth
              margin="normal"
              value={userData.zipcode}
              onChange={(e) => setUserData({ ...userData, zipcode: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateAccount}
              sx={{ marginTop: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box className="tab-content">
            <Typography variant="h5">Change Password</Typography>
            {!passwordVerified ? (
              <TextField
                type="password"
                label="Current Password"
                fullWidth
                margin="normal"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            ) : (
              <TextField
                type="password"
                label="New Password"
                fullWidth
                margin="normal"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={!passwordVerified ? handlePasswordVerification : handlePasswordChange}
              sx={{ marginTop: 2 }}
            >
              {!passwordVerified ? 'Verify Password' : 'Change Password'}
            </Button>
          </Box>
        )}
      </Paper>

      <Snackbar
  open={snackbar.open}
  autoHideDuration={4000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
    {snackbar.message}
  </Alert>
</Snackbar>

    </Container>
  );
};

export default SettingsPage;
