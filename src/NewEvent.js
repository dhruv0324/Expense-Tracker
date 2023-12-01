// NewEvent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewEvent.css'; // Import the NewEvent.css file

const NewEvent = () => {
  const navigate = useNavigate(); // Corrected import
  const [eventName, setEventName] = useState('');
  const [budget, setBudget] = useState('');

  const handleBudgetChange = (e) => {
    // Allow only numbers in the budget input
    const value = e.target.value.replace(/[^0-9]/g, '');
    setBudget(value);
  };

  const handleAddEvent = () => {
    // Add your logic to handle adding the event to the database
    // If successful, redirect to the ongoing event page
    // For now, let's simulate a successful event creation
    // Replace the timeout with your actual logic
    setTimeout(() => {
      navigate('/ongoing-event'); // Corrected line
    }, 1000);
  };

  
  return (
    <div className="new-event-container">
      <div className="new-event-header">
        <h1 className="new-event-title">
          <span className="blue-text">Spend</span>
          <span className="yellow-text">Wise</span>
        </h1>
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
          Add Event
        </button>
      </div>
    </div>
  );
};

export default NewEvent;