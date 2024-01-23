// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; 
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import NewEvent from './NewEvent';
import OngoingEvent from './OngoingEvent';
import EventDetails from './EventDetails';
import AddExpense from './AddExpense';
import PastEvents from './PastEvents';
import PastEventDetails from './PastEventDetails';

const AppRouter = () => {
  return (
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="/ongoing-event" element={<OngoingEvent />} />
          <Route path="/event-details/:eventName" element={<EventDetails />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/past-events" element={<PastEvents />} />
          <Route path="/past-event-details" element={<PastEventDetails />} />
          <Route path="/past-events/:eventName" element={<PastEventDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default AppRouter;
