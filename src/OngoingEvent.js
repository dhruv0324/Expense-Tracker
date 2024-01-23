// OngoingEvent.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './OngoingEvent.css';

const OngoingEvent = () => {
  // Use the useSelector hook to get loggedInUser from the Redux store
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [ongoingEvents, setOngoingEvents] = useState([]);

  useEffect(() => {
    // Fetch the list of ongoing events for the logged-in user from the server
    const fetchOngoingEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/ongoing?username=${loggedInUser}`);
        setOngoingEvents(response.data);
      } catch (error) {
        console.error('Error fetching ongoing events:', error);
      }
    };

    fetchOngoingEvents();
  }, [loggedInUser]); // Add loggedInUser to the dependency array

  return (
    <div className="ongoing-event-container">
      <div className="spend-wise-header">
        <Link to="/dashboard" className="dashboard-title-link">
          <h1 className="spend-wise-title">
            <span className="blue-text">Spend</span>
            <span className="green-text">Wise</span>
          </h1>
        </Link>
      </div>

      {ongoingEvents.length === 0 ? (
        <p className="no-events-message">There are no Ongoing Events for you right now.</p>
      ) : (
        <table className="event-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Remaining Budget</th>
            </tr>
          </thead>
          <tbody>
            {ongoingEvents.map((event) => (
              <tr key={event._id}>
                <td>
                  <Link to={`/event-details/${event.eventName}`} className="event-link">
                    {event.eventName}
                  </Link>
                </td>
                <td>{event.remainingBudget} &#8377;</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="ongoing-events-heading">Your Ongoing Events</div>
    </div>
  );
};

export default OngoingEvent;
