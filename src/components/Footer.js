import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#6941C6',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        position: 'relative',
      }}
    >
      <Typography variant="body2">
        © 2024 City Watch. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
