const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

// 1. Functionality: Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// 2. Functionality: Get a specific user by ID
app.get('/users/:userId', (req, res) => {
  const id = parseInt(req.params.userId);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 3. Functionality: Add a new user
app.post('/users', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({ error: 'Missing required fields' });
  } else {
    const newUser = { id, name };
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

// 4. Functionality: Update a user
app.put('/users/:userId', (req, res) => {
  const id = parseInt(req.params.userId);
  const { name } = req.body;
  const user = users.find(u => u.id === id);
  if (user) {
    user.name = name;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 5. Functionality: Delete a user
app.delete('/users/:userId', (req, res) => {
  const id = parseInt(req.params.userId);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Code Smell 1: Duplicate code
// The code to handle the "User not found" response is duplicated in multiple routes.
// It would be better to extract this logic into a separate function or middleware.

// Code Smell 2: Lack of validation
// The input data is not properly validated before processing.
// For example, when creating or updating a user, there should be validation for the ID and name fields.

// Code Smell 3: Inconsistent naming conventions
// The naming conventions for route parameters and variables are not consistent.
// For example, "id" is used in some places, while "u" or "user" is used in others.

// Design Smell 1: Lack of error handling middleware
// There is no centralized error handling middleware to handle any uncaught errors that might occur during the request processing.

// Design Smell 2: Lack of proper separation of concerns
// The routes and business logic are tightly coupled together in a single file.
// It would be better to separate the routes, data storage, and business logic into separate modules.

// Design Smell 3: Lack of versioning
// The API does not have any versioning mechanism in place, which can lead to compatibility issues when making changes in the future.

// Start the server
app.listen(3000);
