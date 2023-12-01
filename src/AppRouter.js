// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import NewEvent from './NewEvent'; // Import the NewEvent component
import OngoingEvent from './OngoingEvent';
import AddExpense from './AddExpense';
import PastEvents from './PastEvents';
import PastEventDetails from './PastEventDetails';



const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-event" element={<NewEvent />} />
        <Route path="/ongoing-event" element={<OngoingEvent />} /> {/* Add this line */}
        {/* Add routes for other pages as needed */}
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/past-event-details" element={<PastEventDetails />} />
        <Route path="/past-events/:eventId" element={<PastEventDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;