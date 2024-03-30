// Professional.js (Model)

import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema({
  professionalName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },

  

  // Add more fields specific to professionals
});

const ProfessionalModel = mongoose.model("Professional", professionalSchema);

export default ProfessionalModel;
