const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, type: user.type }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users.', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName, age, gender, contactNumber, address, type, isActive } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Email, username and password are required.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      age,
      gender,
      contactNumber,
      address,
      type,
      isActive: Boolean(isActive),
    });

    res.status(201).json({ message: 'User created successfully.', user: { id: user._id, email: user.email, type: user.type, firstName: user.firstName } });
  } catch (error) {
    res.status(500).json({ message: 'Unable to create user.', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update user.', error: error.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: 'User status updated.', isActive: user.isActive });
  } catch (error) {
    res.status(500).json({ message: 'Unable to update user status.', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);

    res.json({ token, firstName: user.firstName, type: user.type, email: user.email, id: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Unable to sign in.', error: error.message });
  }
};