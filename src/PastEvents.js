// PastEvents.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PastEvents.css'; // Create a PastEvents.css file for styling

const PastEvents = () => {
  // Replace these with actual past event details
  const pastEvents = [
    { id: 1, name: "Holiday Trip", amountSaved: 800 },
    { id: 2, name: "Birthday Celebration", amountSaved: 500 },
    // Add more events as needed
  ];

  return (
    <div className="past-events-container">
      <div className="spend-wise-header">
        <h1 className="spend-wise-title">
          <span className="blue-text">Spend</span>
          <span className="yellow-text">Wise</span>
        </h1>
      </div>
      <Link to="/dashboard" className="back-to-dashboard-link">
        Back to Dashboard
      </Link>
      <div className="past-events-heading">
        <h2>Past Events</h2>
      </div>
      <div className="past-events-list">
        {pastEvents.map((event) => (
          <Link key={event.id} to={`/past-events/${event.id}`} className="past-event-link">
            <div className="past-event-item">
              <p className="event-name">{event.name}</p>
              <p className="amount-saved">Amount Saved: ₹{event.amountSaved}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PastEvents;
