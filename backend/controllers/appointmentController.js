// const Appointment = require("../models/appointment");
import { Appointment } from "../models/Appointment.js";
import { Booking } from "../models/Appointment.js";
import User from "../models/User.js";

import mongoose from "mongoose";

// Controller to create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { professional, date, startTime, endTime, location } = req.body;

    // Create a new appointment instance
    const appointment = new Appointment({
      professional,
      date,
      startTime,
      endTime,
      location,
    });

    // Save the appointment to the database
    await appointment.save();

    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments for a professional along with professional details
const getAppointmentsByProfessional = async (req, res) => {
  try {
    const { professional } = req.params;
    console.log("Professional ID:", professional); // Log professional ID

    // Assuming the professional data is stored within the User model
    const user = await User.findById(professional).select("username email");

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // Get appointments for the professional
    const appointments = await Appointment.find({ professional });

    console.log("Appointments:", appointments); // Log appointments
    console.log("Professional Details:", user); // Log professional details

    res.json({ appointments, professionalDetails: user });
  } catch (error) {
    console.error("Error:", error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments for a professional
// const getAppointmentsByProfessional = async (req, res) => {
//   try {
//     const professionalId = "65d9713e9128c8ca87615b15"; // Hardcoded professional ID for testing
//     const appointments = await Appointment.find({
//       professional: professionalId,
//     });
//     res.json(appointments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Controller to retrieve a specific appointment by ID
const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  console.log("id:sdfa: ", id);
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get booking requests by professional
// const getBookingRequestsByProfessional = async (req, res) => {
//   const { professionalId } = req.params;
//   try {
//     // Find booking requests where the professional field matches the provided professional ID
//     // and the status is 'pending', and populate the 'client' field to get client details
//     const bookingRequests = await Booking.find({
//       professional: professionalId,
//       status: "pending",
//     }).populate("client", "username email"); // Include specific client fields
//     res.status(200).json(bookingRequests);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getBookingRequestsByProfessional = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const professional = req.user;
    console.log("Professional ID:", professional); // Log professional ID

    // Get booking requests for the professional
    const bookingRequests = await Booking.find({ professional });

    // Retrieve client details for each booking request
    const bookingRequestsDetails = await Promise.all(
      bookingRequests.map(async (request) => {
        // Assuming client ID is stored in the booking request
        const client = await User.findById(request.client).select(
          "username email"
        );
        return {
          bookingRequest: request,
          clientDetails: client,
        };
      })
    );

    console.log("Booking Requests:", bookingRequests); // Log booking requests

    res.json({
      bookingRequests: bookingRequestsDetails,
    });
  } catch (error) {
    console.error("Error:", error); // Log any errors
    res.status(500).json({ message: error.message });
  }
};
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id, action } = req.params;
    console.log("pid", id, action);

    // Check if the action is either 'confirm' or 'cancel'
    if (action !== "confirm" && action !== "cancel") {
      return res.status(400).json({ error: "Invalid action" });
    }

    let updatedAppointment;

    if (action === "confirm") {
      // Update appointment status to 'confirmed'
      updatedAppointment = await Booking.findByIdAndUpdate(
        id,
        { status: "confirmed" },
        { new: true }
      );
    } else if (action === "cancel") {
      // Remove appointment when rejected
      updatedAppointment = await Booking.findByIdAndDelete(id);
    }

    console.log("Updated appointment:", updatedAppointment);

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// http://localhost:4000/api/appointments/status-update/6608489fc3af40a4c3cfdc86/cancel

// Controller to update an existing appointment
const updateAppointment = async (req, res) => {
  try {
    const { startTime, endTime, location, details } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.startTime = startTime;
    appointment.endTime = endTime;
    appointment.location = location;
    appointment.details = details;
    await appointment.save();
    res
      .status(200)
      .json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const {
      appointment,
      professional,
      client,

      appointmentTime,
      remark,
    } = req.body;
    const newBooking = new Booking({
      appointment,
      professional,
      client,

      appointmentTime,
      remark,
    });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Controller to book an appointment by a client
// const bookAppointment = async (req, res) => {
//   try {
//     const { appointmentId, time, details, client } = req.body;
//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     // Convert start time and end time to milliseconds
//     const startTime = new Date(appointment.startTime).getTime();
//     const endTime = new Date(appointment.endTime).getTime();
//     const requestedTime = new Date(time).getTime();

//     // Check if the requested time is within the appointment time range
//     if (requestedTime < startTime || requestedTime > endTime) {
//       return res.status(400).json({ message: "Invalid appointment time" });
//     }

//     // Check if the requested time slot is available
//     const isSlotAvailable = appointment.bookings.every(
//       (booking) => booking.time.getTime() !== requestedTime
//     );
//     if (!isSlotAvailable) {
//       return res
//         .status(400)
//         .json({ message: "The requested time slot is not available" });
//     }

//     // Create a new booking
//     appointment.bookings.push({
//       client, // Assuming the authenticated user is the client
//       time,
//       status: "Pending", // Initially set to pending until approved by professional
//       details,
//     });
//     await appointment.save();
//     res.status(200).json({ message: "Appointment booked successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Controller to retrieve appointments booked by a client
const getClientAppointments = async (req, res) => {
  try {
    const clientId = req.user._id; // Assuming the authenticated user is the client
    const appointments = await Appointment.find({
      "bookings.client": clientId,
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createAppointment,
  getAppointmentById,
  getAppointmentsByProfessional,
  getBookingRequestsByProfessional,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
  bookAppointment,
  getClientAppointments,
};
