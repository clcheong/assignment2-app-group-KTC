// Design Smell 2: Lack of proper separation of concerns
// Moved the routes and business logic into separate modules.
// routes/users.js
const express = require('express');
const router = express.Router();

// Sample data
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

// 1. Functionality: Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// 2. Functionality: Get a specific user by ID
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.find(u => u.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.notFound('User not found');
  }
});

// 3. Functionality: Add a new user
router.post('/', (req, res) => {
  const { id, name } = req.body;
  const newUser = { id, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 4. Functionality: Update a user
router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const user = users.find(u => u.id === parseInt(userId));
  if (user) {
    user.name = name;
    res.json(user);
  } else {
    res.notFound('User not found');
  }
});

// 5. Functionality: Delete a user
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const index = users.findIndex(u => u.id === parseInt(userId));
  console.log('index -> ', index);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.notFound('User not found');
  }
});


module.exports = router;