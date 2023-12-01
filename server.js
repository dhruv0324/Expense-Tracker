// server.js
const express = require('express');
const mongoose = require('mongoose');
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
      res.status(401).json({ success: false, message: 'Invalid username or password' });
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
    // Assuming you have a way to identify the logged-in user, e.g., through a session or token
    // Retrieve user data based on the logged-in user's information
    const user = await User.findOne({ username: req.body.username });

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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});