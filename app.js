const express = require('express');
const cors = require('cors');
const app = express();
const v1Router = require('./routes/v1/users');

app.use(cors());
app.use(express.json());

// Code Smell 1: Duplicate code
// Removed duplicated code for handling "User not found" response by creating a reusable middleware.
app.use((req, res, next) => {
  res.notFound = (message = 'Not found') => {
    return res.status(404).json({ error: message });
  };
  next();
});


// Code Smell 2: Lack of validation
// Added validation middleware to validate the input data before processing (excluding GET requests).
app.use('/users', (req, res, next) => {
  if (req.method === 'GET') {
    // Skip validation for GET requests
    next();
  } else {
    const { id, name } = req.body;
    if (!id || !name) {
      res.status(400).json({ error: 'Missing required fields' });
    } else {
      next();
    }
  }
});


// Code Smell 3: Inconsistent naming conventions
// Renamed route parameter to use a consistent naming convention.
app.param('userId', (req, res, next, userId) => {
  const id = parseInt(userId);
  req.params.userId = id;
  next();
});


// Design Smell 1: Lack of error handling middleware
// Added a centralized error handling middleware to handle any uncaught errors that might occur during request processing.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});


app.use('/v1/users', v1Router);


app.listen(3000);
