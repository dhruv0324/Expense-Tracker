// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Import your Dashboard.css file for styling

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        // Make an API request to get user data
        const response = await axios.get('http://localhost:5000/api/user');
        console.log(response);
        // Set the user data in state
        setUserData(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="blue-text">Spend</span>
          <span className="yellow-text">Wise</span>
        </h1>
      </div>
      <div className="dashboard-welcome">
        <div className="welcome-container">
          {userData ? (
            <p className="welcome-text">Welcome, {userData.firstName}!</p>
          ) : (
            <p className="welcome-text">Loading...</p>
          )
          }
        </div>
      </div>
      <div className="dashboard-buttons">
        {/* Use Link component for navigation */}
        <Link to="/new-event" className="dashboard-button">
          New Event
        </Link>
        <Link to="/ongoing-event" className="dashboard-button">
          Ongoing Event
        </Link>
        <Link to="/past-events" className="dashboard-button">
          Past Events
        </Link>
      </div>
      <div className="dashboard-footer">
        {/* Add your footer content here */}
        <p>© 2023 SpendWise. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;
