// server.js
const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/expenseTrackerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


// Create a mongoose model for the User collection
const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});


// Create a mongoose model for the Event collection
const Event = mongoose.model('Event', {
  eventName: { type: Schema.Types.String, required: true },
  budget: { type: Schema.Types.Number, required: true },
  remainingBudget: { type: Schema.Types.Number, required: true },
  username: { type: Schema.Types.String, required: true },
  status: { type: Schema.Types.String, enum: ['ongoing', 'past'], default: 'ongoing', required: true },
});

// Create a mongoose model for the Expenses collection
const Expense = mongoose.model('Expense', {
  eventName: { type: Schema.Types.String, required: true },
  expenseName: { type: Schema.Types.String, required: true },
  cost: { type: Schema.Types.Number, required: true },
  username: { type: Schema.Types.String, required: true },
});

// API route to handle user signup
app.post('/api/signup', async (req, res) => {
  try {
    // Create a new user using the User model
    const newUser = new User(req.body);

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//API route to check if username exists
app.get('/api/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });

    // Send the response indicating whether the username exists
    res.status(200).json({ usernameExists: !!existingUser });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to handle user login
app.post('/api/login', async (req, res) => {
  try {
    // Find a user with the provided username and password
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      // User found, send a success response
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      // User not found, send an error response with a specific message
      res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    // Send a general error response
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// API route to get user data
app.get('/api/user', async (req, res) => {
  try {
    const { username } = req.query;

    // Retrieve user data based on the provided username
    const user = await User.findOne({ username });

    if (user) {
      // User found, send the user data
      res.status(200).json(user);
    } else {
      // User not found, send an error response
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Send a general error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to handle adding events
app.post('/api/events', async (req, res) => {
  try {
    // Create a new event using the Event model
    const newEvent = new Event({
      eventName: req.body.eventName,
      budget: req.body.budget,
      remainingBudget: req.body.remainingBudget,
      username: req.body.username,
      status: 'ongoing', // Initial status is 'ongoing'
    });

    // Save the new event to the database
    await newEvent.save();

    // Send a success response
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to get ongoing events for a specific user
app.get('/api/events/ongoing', async (req, res) => {
  try {
    const { username } = req.query;

    // Retrieve ongoing events for the specified username
    const ongoingEvents = await Event.find({ username, status: 'ongoing' });

    // Send the list of ongoing events
    res.status(200).json(ongoingEvents);
  } catch (error) {
    console.error('Error fetching ongoing events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//API route to get Event Details
app.get('/api/events/:eventName', async (req, res) => {
  try {
    const { eventName } = req.params;
    const { username } = req.query;

    // Retrieve event details based on the provided eventName and username
    const event = await Event.findOne({ eventName, username });

    if (event) {
      // Event found, send the event details
      res.status(200).json(event);
    } else {
      // Event not found, send an error response
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error fetching event details:', error);
    // Send a general error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/expenses', async (req, res) => {
  try {
    const { eventName, expenseName, cost, username } = req.body;

    // Find the event with the provided eventName and username
    const event = await Event.findOne({ eventName, username });

    if (!event) {
      // Event not found, send an error response
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if the cost is greater than the remaining budget
    if (cost > event.remainingBudget) {
      return res.status(400).json({ error: 'Expense cost cannot exceed the remaining budget' });
    }

    // Create a new expense using the Expense model
    const newExpense = new Expense({
      eventName,
      expenseName,
      cost,
      username,
    });

    // Save the new expense to the database
    await newExpense.save();

    // Update the remaining budget of the event
    event.remainingBudget -= cost;
    await event.save();

    // Send a success response
    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//API route to get Expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const { eventName, username } = req.query;

    // Query expenses based on both eventName and username
    const expenses = await Expense.find({ eventName, username });

    // Send the list of expenses
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to delete an expense
app.delete('/api/expenses/:expenseId', async (req, res) => {
  try {
    const { expenseId } = req.params;

    // Find the expense in the database
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Retrieve the associated event
    const event = await Event.findOne({ eventName: expense.eventName });

    if (!event) {
      return res.status(404).json({ error: 'Event not found for the expense' });
    }

    // Update the remaining budget of the event
    event.remainingBudget += expense.cost;
    await event.save();

    // Delete the expense from the database
    await Expense.findByIdAndDelete(expenseId);

    // Send a success response
    res.status(200).json({ message: 'Expense deleted successfully', deletedExpense: expense });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to update the status of an event
app.patch('/api/events/:eventName', async (req, res) => {
  try {
    const { eventName } = req.params;
    const { status, username } = req.body;

    // Find the event in the database based on both eventName and username
    const event = await Event.findOne({ eventName, username });

    if (!event) {
      // Event not found, send an error response
      return res.status(404).json({ error: 'Event not found' });
    }

    // Update the status of the event
    event.status = status;
    await event.save();

    // Send a success response
    res.status(200).json({ message: 'Event status updated successfully' });
  } catch (error) {
    console.error('Error updating event status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API route to get past events for a specific user
app.get('/api/events/past/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Retrieve past events for the specified username
    const pastEvents = await Event.find({ username, status: 'past' });

    // Send the list of past events
    res.status(200).json(pastEvents);
  } catch (error) {
    console.error('Error fetching past events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this route to handle the deletion of past events
app.delete('/api/events/past/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the past event in the database
    const pastEvent = await Event.findById(eventId);

    if (!pastEvent || pastEvent.status !== 'past') {
      return res.status(404).json({ error: 'Past event not found' });
    }

    // Find and delete the expenses associated with the past event
    await Expense.deleteMany({ eventName: pastEvent.eventName, username: pastEvent.username });

    // Delete the past event from the database
    await Event.findByIdAndDelete(eventId);

    // Send a success response
    res.status(200).json({ message: 'Past event and associated expenses deleted successfully', deletedEvent: pastEvent });
  } catch (error) {
    console.error('Error deleting past event and expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
