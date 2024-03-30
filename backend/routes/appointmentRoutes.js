import express from "express";
import {
  createAppointment,
  getAppointmentsByProfessional,
  updateAppointment,
  deleteAppointment,
  bookAppointment,
  getClientAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Route to create a new appointment
router.post("/add-appointment", createAppointment);

// Route to retrieve a specific appointment by ID
router.get("/:professional", getAppointmentsByProfessional);

// Route to update an existing appointment
router.put("/:id", updateAppointment);

// Route to delete an appointment
router.delete("/:id", deleteAppointment);

// Route to book an appointment by a client
router.post("/book-appointment", bookAppointment);

// Route to retrieve appointments booked by a client
router.get("/client-appointments", getClientAppointments);

export default router;
