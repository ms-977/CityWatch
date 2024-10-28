// src/pages/RegisterPage.js
import React from 'react';

const RegisterPage = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" required />
        </div>
        <div>
          <label>State:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Zip Code:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default RegisterPage;
