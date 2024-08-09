const User = require('../models/user');

// Create a new user
const createUser = async (req, res) => {
  const { name, email, age, password } = req.body;

  if (!name || !email || !age || !password) {
    return res.status(400).json({ code: 300, message: 'Invalid data' });
  }

  if (name.length < 5 || name.length > 10) {
    return res.status(400).json({ code: 301, message: 'Invalid name : Name must above 5 chars below 10 chars' });
  }

  if (password.length < 5 || password.length > 10) {
    return res.status(400).json({ code: 302, message: 'Invalid password: Password Range Between 5 to 10 chars only ' });
  }

  if (age < 18) {
    return res.status(400).json({ code: 303, message: 'Invalid age: Age mUst Be greater than 18' });
  }

  try {
    const newUser = new User({ name, email, age, password });
    const savedUser = await newUser.save();
    res.status(201).json({ code: 201, message: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users by age
const getUsersByAge = async (req, res) => {
  const age = parseInt(req.params.age);
  try {
    const users = await User.find({ age });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users above a certain age
const getUsersAboveAge = async (req, res) => {
  const age = parseInt(req.params.age);  // parse int conver string to int 
  try {
    const users = await User.find({ age: { $gt: age } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users by name (partial match)
const getUsersByName = async (req, res) => {
  const name = req.params.name;
  try {
    const users = await User.find({ name: new RegExp(name, 'i') });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get users ordered by name
const getUsersOrderedByName = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });   // This sorts the retrieved documents by the name field:
    //{ name: 1 }: The 1 indicates ascending order. If you wanted descending order, you would use -1. This tells MongoDB to sort the results such that users with names earlier in the alphabet come first.
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age, password } = req.body;

  if (!name || !email || !age || !password) {
    return res.status(400).json({ code: 300, message: 'Invalid data' });
  }

  if (name.length < 5 || name.length > 10) {
    return res.status(400).json({ code: 301, message: 'Invalid name' });
  }

  if (password.length < 5 || password.length > 10) {
    return res.status(400).json({ code: 302, message: 'Invalid password' });
  }

  if (age < 18) {
    return res.status(400).json({ code: 303, message: 'Invalid age' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }
    res.status(200).json({ code: 201, message: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }
    res.status(200).json({ message: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Delete users by email
const deleteUsersByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUsers = await User.deleteMany({ email });
    res.status(200).json({ message: deletedUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUsersByAge,
  getUsersAboveAge,
  getUsersByName,
  getUsersOrderedByName,
  updateUser,
  deleteUser,
  deleteUsersByEmail,
};
