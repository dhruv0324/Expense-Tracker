import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './PastEventDetails.css'; // Assuming you have a PastEventDetails.css file for styling

const PastEventDetails = () => {
  const { eventName } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    // Fetch past event details when the component mounts
    const fetchPastEventDetails = async () => {
      try {
        // Fetch event details for the specified event name from the server
        const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventName}?username=${loggedInUser}`);
        setEventDetails(eventResponse.data);

        // Fetch expenses for the specified event name from the server
        const expensesResponse = await axios.get(`http://localhost:5000/api/expenses?eventName=${eventName}&username=${loggedInUser}`);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Error fetching past event details:', error);
      }
    };

    fetchPastEventDetails();
  }, [eventName, loggedInUser]);

  if (!eventDetails) {
    return <div>Loading...</div>; // Add a loading state or component
  }

  const { budget, remainingBudget } = eventDetails;

  return (
    <div className="past-event-details-container">
      <div className="spend-wise-header">
        <Link to="/dashboard" className="dashboard-title-link">
          <h1 className="spend-wise-title">
            <span className="blue-text">Spend</span>
            <span className="green-text">Wise</span>
          </h1>
        </Link>
      </div>
      
      <div className="event-details">
        <h2>{eventName}</h2>
        <div className="budget-details">
          <p>Total Budget: ₹{budget}</p>
          <p>Remaining Budget: ₹{remainingBudget}</p>
        </div>
      </div>
      <div className="expense-section">
        <h3>Expenses</h3>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <p className="expense-name">{expense.expenseName}</p>
              <p className="expense-cost">₹{expense.cost}</p>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/past-events" className="back-to-past-events-link">
        Back to Events
      </Link>
    </div>
  );
};

export default PastEventDetails;
