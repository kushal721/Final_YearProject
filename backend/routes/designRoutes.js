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
  getProfessionalDesigns,
  addRating,
} from "../controllers/designController.js";
import {
  addComment,
  updateComment,
  deleteComment,
  getComments,
} from "../controllers/commentsController.js";
import requireAuth from "../middlewares/requireAuth.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
// Update the route to use multer to handle file uploads
import upload from "../middlewares/upload.js";
const router = express.Router();

// Public routes

// GET all designs
router.get("/", getDesigns);

// GET single design
router.get("/:id", getDesign);//

// Route to fetch professional designs
router.get("/:id/designs", getProfessionalDesigns);//



// POST a new design
router.post("/addrating", requireAuth, addRatingToDesign);
//  UPDATE a design uploaded by the logged-in user
router.patch("/mydesigns/:designId", updateMyDesign);

// GET all comments for a design
router.get("/:designId/comments", getComments);//

// Private routes (require authentication)
router.use(requireAuth);
// router.use(checkUserAuth);

// POST a new design with multer middleware for file uploads
router.post("/adddesign", upload.array("designImages"), addDesigns);//
// // GET all designs uploaded by the logged-in user
router.get("/profe/getDesigns", requireAuth, getMyDesigns);//



// // DELETE a design uploaded by the logged-in user
router.delete("/mydesigns/:id", deleteMyDesign);//

// POST a new comment for a design
router.post("/:designId/comments", addComment);

// UPDATE a comment for a design
router.patch("/:designId/comments/:commentId", updateComment);

// DELETE a comment for a design
router.delete("/:designId/comments/:commentId", deleteComment);

export default router;
