import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  updateProfessionalInfo,
  addProfessionalInfo,
  getProfessionalByProfessionalId,
} from "../controllers/professionalController.js";
import requireAuth from "../middlewares/requireAuth.js";

// import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/:userId", getUserById);
router.get("/", getAllUsers);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

//for professional only

//Route to add professional details
router.post("/addProfessionalDetails", requireAuth, addProfessionalInfo);

//Route to get specific professional details
router.get("/professionals/:professionalId", getProfessionalByProfessionalId);

// Route to update professional information
router.put("/professionals/:professionalId", updateProfessionalInfo);

export default router;
