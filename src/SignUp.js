// SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [validationError, setValidationError] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignUp = async () => {
    // Validation: Check if any field is left empty
    const isEmptyField = Object.values(userData).some((value) => value === '');
    if (isEmptyField) {
      setValidationError('All fields must be filled.');
      return;
    }

    // Basic validation: Email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      setValidationError('Invalid email address.');
      return;
    }

    // Basic validation: 10 digits for phone number
    if (!/^\d{10}$/.test(userData.phone)) {
      setValidationError('Invalid phone number. It should be 10 digits.');
      return;
    }

    // Basic validation: Passwords match
    if (userData.password !== userData.confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    try {
      // Make an API request to your server to store the user data
      const response = await axios.post('http://localhost:5000/api/signup', userData);

      // Log the response from the server (for testing purposes)
      console.log(response.data);

      // Set signup message
      setSignupMessage('Signup Successful!');

      // Redirect to the login page after successful signup
      navigate('/');  //Uncomment this line if you want to redirect after a successful signup
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {validationError && <p className="error-message">{validationError}</p>}
        <input
          type="text"
          placeholder="First Name"
          value={userData.firstName}
          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        {signupMessage && <p>{signupMessage}</p>}
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;