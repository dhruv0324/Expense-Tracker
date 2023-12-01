// PastEventDetails.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PastEventDetails.css'; // Create a PastEventDetails.css file for styling

const PastEventDetails = () => {
  // Replace these with actual event details (passed as props or fetched from the database)
  const eventName = "Graduation Party";
  const totalBudget = 1000;
  const remainingBudget = 200;
  const expenses = [
    { name: 'Dinner', cost: 200 },
    { name: 'Gifts', cost: 100 },
    // ... other expenses
  ];

  return (
    <div className="past-event-details-container">
      <div className="spend-wise-header">
        <h1 className="spend-wise-title">
          <span className="blue-text">Spend</span>
          <span className="yellow-text">Wise</span>
        </h1>
      </div>
      <Link to="/past-events" className="back-to-past-events-link">
        Back to Past Events
      </Link>
      <div className="event-details">
        <h2>{eventName}</h2>
        <div className="budget-details">
          <p>Total Budget: ₹{totalBudget}</p>
          <p>Remaining Budget: ₹{remainingBudget}</p>
        </div>
      </div>
      <div className="expense-section">
        <h3>Expenses</h3>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <p className="expense-name">{expense.name}</p>
              <p className="expense-cost">₹{expense.cost}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PastEventDetails;
