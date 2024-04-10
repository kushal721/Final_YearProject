import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import {
  updateProfessionalInfo,
  createProfessional,
} from "../controllers/professionalController.js";
import requireAuth from "../middlewares/requireAuth.js";

// import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

//for professional only

//Route to add professional details
router.post("/addProfessionalDetails", requireAuth, createProfessional);

// Route to update professional information
router.put("/professionals/:professionalId", updateProfessionalInfo);

export default router;
