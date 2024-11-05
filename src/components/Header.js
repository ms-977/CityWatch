import React from 'react';

function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>CITYWATCH</h1>
      <button style={buttonStyle}>Create Report</button>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#6941C6',
  color: '#fff',
};

const titleStyle = {
  margin: 0,
  fontSize: '1.5rem',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#fff',
  color: '#6941C6',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
};

export default Header;
