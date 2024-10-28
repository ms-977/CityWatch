// src/pages/LoginPage.js
import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h2>Welcome to City Watch</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default LoginPage;
