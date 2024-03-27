import express from "express";
import {
  addDesigns,
  getDesigns,
  getDesign,
  getMyDesigns,
  getMyDesign,
  deleteMyDesign,
  updateMyDesign,
  productReview,
} from "../controllers/designController.js"; // Import named export
import requireAuth from "../middlewares/requireAuth.js";

const router = express.Router();

// //public routes

//GET all designs
router.get("/", getDesigns);

//GET single designs
router.get("/:id", getDesign);

//review product

router.patch("/:id/review", productReview);

//private routes
//require auth for design routes
router.use(requireAuth);

// POST a new design
router.post("/adddesign", addDesigns);

//GET all designs
router.get("/", getMyDesigns);

//GET single designs
router.get("/:id", getMyDesign);

//DELETE a  workout
router.delete("/:id", deleteMyDesign);

//UPDATE a  workout
router.patch("/:id", updateMyDesign);

export default router; // Export the router as default
