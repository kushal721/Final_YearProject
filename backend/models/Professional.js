import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: String, // Storing experience as a string
    required: true,
  },

  description: {
    type: String, // Professional description
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  education: {
    type: String, // Education details
    required: true,
  },

  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const ProfessionalModel = mongoose.model("Professional", professionalSchema);

export default ProfessionalModel;
