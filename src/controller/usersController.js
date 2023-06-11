// Import data
const { users } = require('../data/data');

// 1. Functionality: Get all users
function getAllUsers(req, res) {
  res.json(users);
}

// 2. Functionality: Get a specific user by ID
function getSpecificUser(req, res) {
  const { userId } = req.params;
  const user = users.find(u => u.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.notFound('User not found');
  }
}

// 3. Functionality: Add a new user
function addUser(req, res) {
  const { id, name } = req.body;
  const newUser = { id, name };
  users.push(newUser);
  res.status(201).json(newUser);
}

// 4. Functionality: Update a user
function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  const user = users.find(u => u.id === parseInt(userId));
  if (user) {
    user.name = name;
    res.json(user);
  } else {
    res.notFound('User not found');
  }
}

// 5. Functionality: Delete a user
function deleteUser(req, res) {
  const { userId } = req.params;
  const index = users.findIndex(u => u.id === parseInt(userId));
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.notFound('User not found');
  }
}

module.exports = {
  getAllUsers,
  getSpecificUser,
  addUser,
  updateUser,
  deleteUser
};
