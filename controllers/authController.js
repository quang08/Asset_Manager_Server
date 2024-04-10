// authController.js

const User = require("../models/User");

const authController = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      // Create new user
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Find user by username (assuming user data is stored in your database)
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Check if the password matches
      if (password === user.password) {
        // Set the user object in the request
        req.user = user;
        return res.status(200).json({ message: "Login successful", user });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      // Your logout logic here, such as clearing session data
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  isLoggedIn: async (req, res) => {
    try {
      // Check if user is authenticated (logged in)
      if (req.user) {
        // User is logged in
        return res.status(200).json({ loggedIn: true });
      } else {
        // User is not logged in
        return res.status(200).json({ loggedIn: false });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
