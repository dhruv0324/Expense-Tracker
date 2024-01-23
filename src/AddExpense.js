import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('https://files.123freevectors.com/wp-content/original/106565-blue-and-green-abstract.jpg');
  padding: 20px;
`;

const Title = styled.h1`
  color: #3498db;
  font-size: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none !important;
`;

const DashboardTitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
  display: inline-block;
`;

const BlueText = styled.span`
  color: #3498db;
`;

const GreenText = styled.span`
  color: lightgreen;
`;

const RemainingBudgetMessage = styled.div`
  background-color: #3498db;
  color: #f39c12;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: bold;
`;

const AddExpenseMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;

const ExpenseForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 400px;
  margin: 20px auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const AddButton = styled.button`
  background-color: lightgreen;
  color: white;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const BackLink = styled(Link)`
  color: #3498db;
  margin-top: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #2980b9;
  }
`;

const EventName = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #3498db;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 20px;
  width: 600px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AddExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temporaryEventName = useSelector((state) => state.temporaryEventName);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [expenseName, setExpenseName] = useState('');
  const [expenseCost, setExpenseCost] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${temporaryEventName}?username=${loggedInUser}`);
        setRemainingBudget(response.data.remainingBudget);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    if (temporaryEventName && loggedInUser) {
      fetchEventDetails();
    }
  }, [temporaryEventName, loggedInUser]);

  const handleExpenseAddition = async (e) => {
    e.preventDefault();

    if (!expenseName || !expenseCost) {
      setValidationError('Please fill out both expense name and cost.');
      return;
    }

    if (parseInt(expenseCost) > remainingBudget) {
      setValidationError('Expense cost cannot exceed the remaining budget.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/expenses', {
        eventName: temporaryEventName,
        expenseName,
        cost: parseInt(expenseCost),
        username: loggedInUser,
      });

      dispatch({ type: 'SET_TEMPORARY_EVENT_NAME', payload: temporaryEventName });

      const updatedRemainingBudget = remainingBudget - parseInt(expenseCost);
      setRemainingBudget(updatedRemainingBudget);

      dispatch({ type: 'CLEAR_TEMPORARY_EVENT_NAME' });

      navigate(`/event-details/${temporaryEventName}`);
    } catch (error) {
      console.error('Error adding expense:', error);
      setValidationError('An error occurred while adding the expense. Please try again.');
    }
  };

  return (
    <Container>
      <Title>
        <DashboardTitleLink to="/dashboard" className="dashboard-title-link">
          <BlueText>Spend</BlueText>
          <GreenText>Wise</GreenText>
        </DashboardTitleLink>
      </Title>
      <FormWrapper>
      <AddExpenseMessage>
        <p><EventName>{temporaryEventName}</EventName></p>
      </AddExpenseMessage>
      <RemainingBudgetMessage>
        <p>You have ₹{remainingBudget.toFixed(2)} left to spend.</p>
      </RemainingBudgetMessage>
      <AddExpenseMessage>
        <p>Add your expense:</p>
      </AddExpenseMessage>
      <ExpenseForm onSubmit={handleExpenseAddition}>
        <FormGroup>
          <Label htmlFor="expenseName">Expense Name:</Label>
          <Input
            type="text"
            id="expenseName"
            name="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="expenseCost">Cost:</Label>
          <Input
            type="number"
            id="expenseCost"
            name="expenseCost"
            value={expenseCost}
            onChange={(e) => setExpenseCost(e.target.value)}
          />
        </FormGroup>
        {validationError && <div className="validation-error">{validationError}</div>}
        <AddButton type="submit">Add</AddButton>
      </ExpenseForm>
      </FormWrapper>
      <BackLink to={`/event-details/${temporaryEventName}`}>Back to Events</BackLink>
    </Container>
  );
};

export default AddExpense;
