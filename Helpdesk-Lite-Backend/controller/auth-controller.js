const { createUser, findByEmailOrUsername, findByEmail } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user (SQL-backed)
const registerUser = async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'email, username and password are required', success: false });
    }

    const existingUser = await findByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = await createUser({ name, email, username, password: hashedPassword, role });

    if (userId) {
      return res.status(201).json({ message: 'User registered successfully', success: true, userId });
    }
    return res.status(400).json({ message: 'User registration failed', success: false });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required', success: false });
    }

    const user = await findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials', success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials', success: false });

    const token = jwt.sign({ 
        userId: user._id,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', success: true, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

module.exports = { registerUser, loginUser };