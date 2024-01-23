import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('https://img.freepik.com/free-vector/gradient-background-green-modern-designs_343694-2067.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais')center;
  background-size:cover;
  padding: 20px;
  min-height: 100vh;
  width: 100%; /* Ensure full width */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

const SpendWiseHeader = styled.div`
  background: none !important;
`;

const SpendWiseTitle = styled.h1`
  color: #3498db;
  font-size: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none !important;
`;

const BlueText = styled.span`
  color: #3498db;
`;

const GreenText = styled.span`
  color: lightgreen;
`;

const PastEventsHeading = styled.h2`
  font-size: 28px;
  margin: 20px 0;
`;

const PastEventsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
`;

const PastEventItem = styled.div`
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .past-event-link {
    text-decoration: none;
    color: inherit;

    .event-name {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
    }

    .amount-saved {
      margin: 0;
      font-size: 18px;
      color: #3498db;
      font-weight: bold;
    }
  }

  .delete-button {
    background-color: red !important;
    color: white;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #c0392b;
    }
  }
`;

const PastEvents = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [pastEvents, setPastEvents] = useState([]);

  const fetchPastEvents = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/past/${loggedInUser}`);
      setPastEvents(response.data);
    } catch (error) {
      console.error('Error fetching past events:', error);
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchPastEvents();
  }, [fetchPastEvents]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/past/${eventId}`);
      fetchPastEvents();
    } catch (error) {
      console.error('Error deleting past event:', error);
    }
  };

  return (
    <Container>
      <SpendWiseHeader>
        <Link to="/dashboard" className="dashboard-title-link">
          <SpendWiseTitle>
            <BlueText>Spend</BlueText>
            <GreenText>Wise</GreenText>
          </SpendWiseTitle>
        </Link>
      </SpendWiseHeader>

      <PastEventsHeading>Past Events</PastEventsHeading>
      <PastEventsList>
        {pastEvents.map((event) => (
          <PastEventItem key={event._id}>
            <Link to={`/past-events/${event.eventName}`} className="past-event-link">
              <p className="event-name">{event.eventName}</p>
              <p className="amount-saved">Remaining Budget: ₹{event.remainingBudget}</p>
            </Link>
            <button onClick={() => handleDeleteEvent(event._id)} className="delete-button">
              Delete
            </button>
          </PastEventItem>
        ))}
      </PastEventsList>
    </Container>
  );
};

export default PastEvents;
