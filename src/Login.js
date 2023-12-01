// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleLogin = async () => {
    // Validation: Check if any field is left empty
    const isEmptyField = Object.values(loginData).some((value) => value === '');
    if (isEmptyField) {
      setValidationError('All fields must be filled.');
      return;
    }

    try {
      // Make an API request to your server to check login credentials
      const response = await axios.post('http://localhost:5000/api/login', loginData);

      // Check if login is successful based on the response from the server
      if (response.data.success) {
        console.log('Login successful:', loginData);

        // Store the username in local storage
        localStorage.setItem('loggedInUser', loginData.username);

        // Redirect to the dashboard after successful login
        navigate('/dashboard');
      } else {
        // If the server indicates unsuccessful login, show an error message
        setValidationError(response.data.message || 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {/* Use your blue and yellow color scheme for the title */}
        <h2>
          <span className="blue-text">Spend</span>
          <span className="yellow-text">Wise</span>
        </h2>
        {validationError && <p className="error-message">{validationError}</p>}
        {/* Decrease the length of the input boxes */}
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          style={{ maxWidth: '300px' }} /* Set the max-width inline */
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          style={{ maxWidth: '300px' }} /* Set the max-width inline */
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
