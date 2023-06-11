const express = require('express');
const router = express.Router();

// Import logic implementation
const {
  getAllUsers,
  getSpecificUser,
  addUser,
  updateUser,
  deleteUser
} = require('../../src/controller/usersController');

// 1. Functionality: Get all users
router.get('/', getAllUsers);

// 2. Functionality: Get a specific user by ID
router.get('/:userId', getSpecificUser);

// 3. Functionality: Add a new user
router.post('/', addUser);

// 4. Functionality: Update a user
router.put('/:userId', updateUser);

// 5. Functionality: Delete a user
router.delete('/:userId', deleteUser);

module.exports = router;
