import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(); // Find all users
    res.status(200).json(users); // Respond with the list of users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters
    const user = await UserModel.findById(userId); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Respond with the user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update user details
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, role } = req.body;

    // Find the user by ID
    let user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.username = username || user.username; // Keep existing username if not provided
    user.email = email || user.email; // Keep existing email if not provided
    user.role = role || user.role; // Keep existing role if not provided

    // Hash the new password if provided
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }

    // Save the updated user
    user = await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters
    const deletedUser = await UserModel.findByIdAndDelete(userId); // Find user by ID and delete
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Export the controller functions
export { getAllUsers, getUserById, updateUser, deleteUser };
