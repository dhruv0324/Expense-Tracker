import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  min-height: 100vh;
  background: url('https://files.123freevectors.com/wp-content/original/154243-abstract-blue-green-and-white-background-design.jpg');
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

const EventTitle = styled.h2`
  font-size: 28px;
  margin: 20px 0;
`;

const RemainingBudget = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  background-color: lightgreen;
  color: white;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ExpensesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
`;

const ExpenseItem = styled.div`
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  p {
    margin: 0;
  }

  button {
    background-color: #e74c3c;
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

const AddExpenseButton = styled(StyledButton)`
  margin: 10px 0;
`;

const EndEventButton = styled(StyledButton)`
  background-color: #e74c3c !important;
  margin: 10px 0; 
`;

const BackButton = styled(Link)`
  display: block;
  margin-top: 20px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  color: #3498db;
  transition: color 0.3s ease;

  &:hover {
    color: #2980b9;
  }
`;

const EventDetails = () => {
  const { eventName } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventName}?username=${loggedInUser}`);
        setEventDetails(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/expenses?eventName=${eventName}&username=${loggedInUser}`);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchEventDetails();
    fetchExpenses();
  }, [eventName, loggedInUser]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const handleAddExpense = () => {
    dispatch({ type: 'SET_TEMPORARY_EVENT_NAME', payload: eventName });
    navigate('/add-expense');
  };

  const handleEndEvent = async () => {
    try {
      // Update the event status to "past" in the database
      await axios.patch(`http://localhost:5000/api/events/${eventName}`, {
        status: 'past',
        username: loggedInUser,
      });
  
      // Redirect users back to the ongoing events page
      navigate('/ongoing-event');
    } catch (error) {
      console.error('Error ending event:', error);
    }
  };

  const handleDeleteExpense = async (expenseId, cost) => {
    try {
      // Delete the expense from the database
      await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`);
  
      // Update the remaining budget of the event
      setEventDetails((prevEventDetails) => ({
        ...prevEventDetails,
        remainingBudget: prevEventDetails.remainingBudget + cost,
      }));
  
      // Remove the deleted expense from the local state
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
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
      <EventTitle>{eventDetails.eventName}</EventTitle>
      <RemainingBudget>Remaining Budget: {eventDetails.remainingBudget} &#8377;</RemainingBudget>

      <AddExpenseButton onClick={handleAddExpense}>Add Expense</AddExpenseButton>

      <h3>Expenses for {eventDetails.eventName}</h3>
      <ExpensesContainer>
        {expenses.map((expense) => (
          <ExpenseItem key={expense._id}>
            <p>
              {expense.expenseName} - {expense.cost} &#8377;
            </p>
            <button onClick={() => handleDeleteExpense(expense._id, expense.cost)}>Delete</button>
          </ExpenseItem>
        ))}
      </ExpensesContainer>
      <EndEventButton onClick={handleEndEvent}>End Event</EndEventButton>   
      <BackButton to="/ongoing-event">Back to Ongoing Events</BackButton>
    </Container>
  );
};


export default EventDetails;
