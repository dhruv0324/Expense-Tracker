import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (loggedInUser) {
          const response = await axios.get(`http://localhost:5000/api/user?username=${loggedInUser}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [loggedInUser]);

  const handleLogout = () => {
    // Dispatch an action to clear the loggedInUser in the Redux store
    dispatch({ type: 'CLEAR_LOGGED_IN_USER' });
    // Redirect to the login page after logout
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="blue-text">Spend</span>
          <span className="green-text">Wise</span>
        </h1>
      </div>
      <div className="dashboard-welcome">
        <div className="welcome-container">
          {userData ? (
            <>
             <p className="welcome-text">
               Welcome, {userData.firstName}! 
               <br /><br /> 
             </p>
             <p className="opening-text">
               Track your expenses effortlessly with SpendWise and watch your financial goals come to life.
             </p>
             <p className="continuous-effect">
               Remember: Every penny saved is a step forward on your journey towards financial success!
             </p>
           </>
          ) : (
            <p className="welcome-text">Loading...</p>
          )}
        </div>
      </div>
      <div className="dashboard-buttons">
        <Link to="/new-event" className="dashboard-button">
          New Event
        </Link>
        <Link to="/ongoing-event" className="dashboard-button">
          Ongoing Events
        </Link>
        <Link to="/past-events" className="dashboard-button">
          Past Events
        </Link>
      </div>
      <button className="dashboard-logout-button" onClick={handleLogout}>
          Logout
        </button>
      <div className="dashboard-footer">
        <p>© 2023 SpendWise. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;
