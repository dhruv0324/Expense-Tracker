// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import axios from 'axios';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch(); // Get the dispatch function
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

        // Dispatch an action to update the Redux store with the logged-in user's username
        dispatch({ type: 'SET_LOGGED_IN_USER', payload: loginData.username });
        console.log('Action dispatched to Redux:', { type: 'SET_LOGGED_IN_USER', payload: loginData.username });

        // Redirect to the dashboard after successful login
        navigate('/dashboard');
      } else {
        // If the server indicates unsuccessful login, show an error message
        setValidationError(response.data.message || 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
  
      if (error.response && error.response.data) {
        // Check if there's a specific error message from the server
        const errorMessage = error.response.data.message || 'Invalid username or password.';
        setValidationError(errorMessage);
      } else {
        // If no specific error message, set a default one
        setValidationError('An error occurred during login.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>
          <span className="blue-text">Spend</span>
          <span className="green-text">Wise</span>
        </h2>
        {validationError && <p className="error-message">{validationError}</p>}
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          style={{ maxWidth: '300px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          style={{ maxWidth: '300px' }}
        />
        <button onClick={handleLogin}
        style={{
          backgroundColor: 'lightgreen',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'block',
          margin: '10px auto', // Center both horizontally and vertically
        }}>Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;