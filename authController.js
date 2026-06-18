import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { signToken } from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are all required");
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    res.status(400);
    throw new Error("An account with that email already exists");
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    phone,
    role: "user", // public signups are always plain users, never admin
  });

  const token = signToken(user);

  res.status(201).json({
    success: true,
    token,
    user: user.toSafeObject(),
  });
});

// @desc    Log in an existing user (or the seeded admin)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email/username and password are required");
  }

  // select("+password") because the schema hides password by default
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Incorrect email/username or password");
  }

  const token = signToken(user);

  res.json({
    success: true,
    token,
    user: user.toSafeObject(),
  });
});

// @desc    Get the currently logged-in user's profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user.toSafeObject() });
});
