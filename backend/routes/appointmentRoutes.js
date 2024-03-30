import express from "express";
import {
  createAppointment,
  getAppointmentsByProfessional,
  getAppointmentById,
  getBookingRequestsByProfessional,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
  bookAppointment,
  getClientAppointments,
} from "../controllers/appointmentController.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = express.Router();

// Route to create a new appointment
router.post("/add-appointment", createAppointment);

// Route to retrieve a specific appointment by professional
router.get("/:professional", getAppointmentsByProfessional);

// Route to retrieve a specific appointment by id
router.get("/appo-id/:id", getAppointmentById);

// Route to update an existing appointment
router.put("/:id", updateAppointment);

// Route to delete an appointment
router.delete("/:id", deleteAppointment);

// Route to book an appointment by a client
router.post("/book-appointment", bookAppointment);

// Route to retrieve appointments booked by a client
router.get("/client-appointments", getClientAppointments);

//private

router.use(requireAuth);

// Route to retrieve booking request
router.get(
  "/booking-request/:professionalId",
  getBookingRequestsByProfessional
);

// Route to update appointment status
router.put("/:id/:action", updateAppointmentStatus);

export default router;
