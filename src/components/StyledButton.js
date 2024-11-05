import React from 'react';
import { Button } from '@mui/material';

const StyledButton = ({ text, onClick, fullWidth }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: '#6941C6',
        color: '#fff',
        width: fullWidth ? '100%' : 'auto',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#532f9b',
        },
      }}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
