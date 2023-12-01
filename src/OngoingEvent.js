// OngoingEvent.js
import React from 'react';
import { Link } from 'react-router-dom';
import './OngoingEvent.css'; // Create an OngoingEvent.css file for styling

const OngoingEvent = () => {
  // Replace these with actual event details
  const eventName = "Birthday Party";
  const remainingBudget = 500;

  return (
    <div className="ongoing-event-container">
      <div className="spend-wise-header">
        <h1 className="spend-wise-title">
          <span className="blue-text">Spend</span>
          <span className="yellow-text">Wise</span>
        </h1>
        
      </div>
      <Link to="/dashboard" className="back-to-dashboard-link">
          Back to Dashboard
      </Link>
      <div className="event-details">
        <h2>{eventName}</h2>
        <div className="remaining-budget-message">
          Remaining Budget: {remainingBudget} <span>&#8377;</span>
        </div>
      </div>
      <Link to="/add-expense" className="add-expense-button">
        Add Expense
      </Link>
      <div className="expense-section">
        {/* Display previous expenses here */}
        <div className="expense-item">
          <div className="expense-details">
            <p className="expense-name">Dinner</p>
            <p className="expense-cost">₹200.00</p>
          </div>
          {/* Add delete button or additional details as needed */}
        </div>
      </div>
      <button className="end-event-button">End Event</button>
    </div>
  );
};

export default OngoingEvent;
