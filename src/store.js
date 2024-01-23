// store.js
import { createStore } from 'redux';

// Define initial state
const initialState = {
  loggedInUser: null,
  temporaryEventName: null,
};

// Define reducer function
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER':
      return { ...state, loggedInUser: action.payload };
    case 'CLEAR_LOGGED_IN_USER':
      return { ...state, loggedInUser: null };
    case 'SET_TEMPORARY_EVENT_NAME':
      return { ...state, temporaryEventName: action.payload };
    case 'CLEAR_TEMPORARY_EVENT_NAME':
      return { ...state, temporaryEventName: null };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(rootReducer);

export default store;
