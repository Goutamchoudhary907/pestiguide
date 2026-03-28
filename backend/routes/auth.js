const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Zod schema
const authSchema = zod.object({
  email: zod.string().email(),
  password: zod.string()
});

// Signup route
router.post("/signup", async (req, res) => {
  const { success } = authSchema.safeParse(req.body);
  if (!success) return res.status(400).json({ message: "Invalid input" });

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(409).json({ message: "Email already exists" });

  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password
  });

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
  res.json({ message: "User created", token });
});

// Signin route
router.post("/signin", async (req, res) => {
  const { success } = authSchema.safeParse(req.body);
  if (!success) return res.status(400).json({ message: "Invalid input" });

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ message: "Login successful", token });
});

// Signout route
router.post("/signout", (req, res) => {
  res.json({ message: "Signed out (token deleted on client)" });
});

router.get('/status', authMiddleware, (req, res) => {
  res.json({ isAuthenticated: true, userId: req.userId });
});

module.exports = router;
