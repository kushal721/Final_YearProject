import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  bookings: [
    {
      client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      time: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
      details: {
        type: String,
      },
    },
  ],
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
