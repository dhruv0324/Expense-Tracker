// NewEvent.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NewEvent.css'; // Import the NewEvent.css file

const NewEvent = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  
  const [eventName, setEventName] = useState('');
  const [budget, setBudget] = useState('');

  const handleBudgetChange = (e) => {
    // Allow only numbers in the budget input
    const value = e.target.value.replace(/[^0-9]/g, '');
    setBudget(value);
  };

  const handleAddEvent = async () => {
    try {
      // Make an API request to save the new event in the database
      const response = await axios.post('http://localhost:5000/api/events', {
        eventName,
        budget: parseFloat(budget),
        remainingBudget: parseFloat(budget),
        username: loggedInUser,
        status: 'ongoing',
      });
  
      // Check if the event was successfully created
      if (response.status === 201) {
        // Redirect to the ongoing event page
        navigate('/ongoing-event');
      } else {
        console.error('Failed to add event:', response.data);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
  
  

  return (
    <div className="new-event-container">
      <div className="new-event-header">
        <Link to="/dashboard" className="dashboard-title-link">
          <h1 className="new-event-title">
            <span className="blue-text">Spend</span>
            <span className="green-text">Wise</span>
          </h1>
        </Link>
      </div>

      <div className="new-event-form">
        <div className="form-group">
          <label htmlFor="eventName">Name of Event</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventBudget">Budget</label>
          <div className="input-with-symbol">
            <span className="rupee-symbol">&#8377;</span>
            <input
              type="text"
              id="eventBudget"
              value={budget}
              onChange={handleBudgetChange}
            />
          </div>
        </div>

        <button className="add-event-button" onClick={handleAddEvent}>
          Create Event
        </button>
      </div>
    </div>
  );
};

export default NewEvent;
