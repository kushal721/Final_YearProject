// const Appointment = require("../models/appointment");
import Appointment from "../models/Appointment.js";

import mongoose from "mongoose";

// Controller to create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { professional, startTime, endTime, location } = req.body;

    // Create a new appointment instance
    const appointment = new Appointment({
      professional,
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

// Controller to retrieve all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to retrieve a specific appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

// Controller to book an appointment by a client
const bookAppointment = async (req, res) => {
  try {
    const { appointmentId, time, details, client } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Convert start time and end time to milliseconds
    const startTime = new Date(appointment.startTime).getTime();
    const endTime = new Date(appointment.endTime).getTime();
    const requestedTime = new Date(time).getTime();

    // Check if the requested time is within the appointment time range
    if (requestedTime < startTime || requestedTime > endTime) {
      return res.status(400).json({ message: "Invalid appointment time" });
    }

    // Check if the requested time slot is available
    const isSlotAvailable = appointment.bookings.every(
      (booking) => booking.time.getTime() !== requestedTime
    );
    if (!isSlotAvailable) {
      return res
        .status(400)
        .json({ message: "The requested time slot is not available" });
    }

    // Create a new booking
    appointment.bookings.push({
      client, // Assuming the authenticated user is the client
      time,
      status: "Pending", // Initially set to pending until approved by professional
      details,
    });
    await appointment.save();
    res.status(200).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  bookAppointment,
  getClientAppointments,
};
