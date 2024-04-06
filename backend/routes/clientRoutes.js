import express, { request } from "express";
const router = express.Router();
import UserController from "../controllers/clientController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

import UserModel from "../models/User.js";

import {
  getProfessionals,
  getProfessionalById,
} from "../controllers/professionalController.js";

// Protected Routes
// router.get("/protected-route", checkUserAuth, (req, res) => {
//   // Access user data attached to the req object
//   const data = req.user;
// });

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
router.post("/user-register", UserController.userRegistration);
router.post("/user-login", UserController.userLogin);
router.post(
  "/user-send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);
router.post(
  "/user-reset-password/:id/:token",
  UserController.userPasswordReset
);

//get all professionals
router.get("/professionals", getProfessionals);
router.get("/professional/:id", getProfessionalById);

// Protected Routes
router.post("/user-changePassword", UserController.changeUserPassword);
router.get("/loggedUser", UserController.loggedUser);

export default router;
