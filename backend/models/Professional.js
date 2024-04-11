import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialization: {
    type: String,
  },
  experience: {
    type: String, // Storing experience as a string
  },

  description: {
    type: String, // Professional description
  },
  skills: {
    type: String,
  },
  education: {
    type: String, // Education details
  },

  contact: {
    type: String,
  },
});

const ProfessionalModel = mongoose.model("Professional", professionalSchema);

export default ProfessionalModel;
