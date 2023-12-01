// AddExpense.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AddExpense.css';

const AddExpense = () => {
  // Replace these with actual data or retrieve them from the state
  const remainingBudget = 500.00;

  return (
    <div className="add-expense-container">
      <div className="spend-wise-header">
        <h1 className="spend-wise-title">
          <span className="blue-text">Spend</span>
          <span className="yellow-text">Wise</span>
        </h1>
      </div>
      <div className="remaining-budget-message">
        <p>You have ₹{remainingBudget.toFixed(2)} left to spend.</p>
      </div>
      <div className="add-expense-message">
        <p>Add your expense:</p>
      </div>
      <form className="expense-form">
        <div className="form-group">
          <label htmlFor="expenseName">Expense Name:</label>
          <input type="text" id="expenseName" name="expenseName" />
        </div>
        <div className="form-group">
          <label htmlFor="expenseCost">Cost:</label>
          <input type="number" id="expenseCost" name="expenseCost" />
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
      <Link to="/ongoing-event" className="back-link">
        Back to Ongoing Event
      </Link>
    </div>
  );
};

export default AddExpense;
