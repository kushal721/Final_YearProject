import express, { request } from "express";
const router = express.Router();
import UserController from "../controllers/authController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

import {} from "../controllers/professionalController.js";
import upload from "../middlewares/upload.js";

router.post("/protected-route", checkUserAuth, async (req, res) => {
  try {
    // Extract user ID from the request body
    const { userId } = req.body;

    // Find the user by ID
    const user = await UserModel.findOne(userId);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .send({ message: "User does not exist", success: false });
    }

    // If user exists, send user data in the response
    res.status(200).send({
      success: true,
      data: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Handle internal server error
    console.error("Error getting user:", error);
    res.status(500).send({ message: "Error getting user", success: false });
  }
});

router.use("/loggedUser", checkUserAuth);
router.use("/user-changePassword", checkUserAuth);

// Public Routes
router.post(
  "/user-register",
  upload.array("profile"),
  UserController.userRegistration
);

router.post("/user-login", UserController.userLogin);
router.post(
  "/user-send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);
router.post(
  "/user-reset-password/:id/:token",
  UserController.userPasswordReset
);

router.get("/forgotPassword/:id/:token", async (req, res) => {
  console.log("ok");
  const { id, token } = req.params;
  const { email } = jwt.decode(token);
  res.render("forgotPassword", { id, token, email, status: "verified" });
});

// Protected Routes
router.put("/user-changePassword", UserController.changePassword);
router.get("/loggedUser", UserController.loggedUser);

export default router;
