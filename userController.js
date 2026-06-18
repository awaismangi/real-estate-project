import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ success: true, users: users.map((u) => u.toSafeObject()) });
});

// @desc    Delete a user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.role === "admin") {
    res.status(400);
    throw new Error("Cannot delete an admin account");
  }

  await user.deleteOne();
  res.json({ success: true, message: "User deleted successfully" });
});
