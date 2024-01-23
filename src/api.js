// api.js
import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your server URL

export const createUser = (userData) => axios.post(`${baseURL}/users/signup`, userData);
export const loginUser = (userData) => axios.post(`${baseURL}/users/login`, userData);
export const createEvent = (eventData) => axios.post(`${baseURL}/events/new`, eventData);
// Add more API functions as needed
