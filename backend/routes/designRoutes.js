// import express from "express";
// import {
//   addDesigns,
//   getDesigns,
//   getDesign,
//   getMyDesigns,
//   getMyDesign,
//   deleteMyDesign,
//   updateMyDesign,
//   productReview,
// } from "../controllers/designController.js"; // Import named export
// import requireAuth from "../middlewares/requireAuth.js";

// const router = express.Router();

// // //public routes

// //GET all designs
// router.get("/", getDesigns);

// //GET single designs
// router.get("/:id", getDesign);

// //review product

// router.patch("/:id/review", productReview);

// //private routes
// //require auth for design routes
// router.use(requireAuth);

// // POST a new design
// router.post("/adddesign", addDesigns);

// //GET all designs
// router.get("/mydesigns", getMyDesigns);

// //GET single designs
// router.get("/:id", getMyDesign);

// //DELETE a  workout
// router.delete("/:id", deleteMyDesign);

// //UPDATE a  workout
// router.patch("/:id", updateMyDesign);

// export default router; // Export the router as default
import express from "express";
import {
  addRatingToDesign,
  addDesigns,
  getDesigns,
  getDesign,
  getMyDesigns,
  getMyDesign,
  deleteMyDesign,
  updateMyDesign,
  productReview,
  getProfessionalDesigns,
  addRating,
} from "../controllers/designController.js";
import requireAuth from "../middlewares/requireAuth.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

const router = express.Router();

// Public routes

// GET all designs
router.get("/", getDesigns);

// GET single design
router.get("/:id", getDesign);

// Route to fetch professional designs
router.get("/:id/designs", getProfessionalDesigns);

// Review product
router.patch("/design/:id/review", productReview);

// POST a new design
router.post("/addrating", requireAuth, addRatingToDesign);
//  UPDATE a design uploaded by the logged-in user
router.patch("/mydesigns/:designId", updateMyDesign);

// Private routes (require authentication)
router.use(requireAuth);
// router.use(checkUserAuth);

// POST a new design
router.post("/adddesign", addDesigns);
// // GET all designs uploaded by the logged-in user
router.get("/profe/getDesigns", getMyDesigns);

// // // GET a single design uploaded by the logged-in user
// router.get("/mydesign/:id", getMyDesign);

// // DELETE a design uploaded by the logged-in user
router.delete("/mydesigns/:id", deleteMyDesign);

export default router;
