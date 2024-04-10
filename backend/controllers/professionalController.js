import User from "../models/User.js";

import ProfessionalModel from "../models/Professional.js";

//client side

// Get all professionals
const getProfessionals = async (req, res) => {
  try {
    const professionals = await User.find({ role: "professional" }).sort({
      createdAt: -1,
    });
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get professional by ID
const getProfessionalById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the professional ID is passed in the URL params
    const professional = await User.findOne({
      _id: id,
      role: "professional",
    }).select("-password");

    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update professionals profile
const updateProfileController = async (req, res) => {
  try {
    const professional = await professionalModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

//for professional only

// Controller to create a new professional
const addProfessionalInfo = async (req, res) => {
  try {
    // Get the user ID from the authenticated user object or token
    const userId = req.user._id; // Adjust this according to your authentication setup
    console.log("user user", userId);

    const {
      specialization,
      experience,
      description,
      skills,
      education,
      contact,
    } = req.body;

    // Create a new professional instance
    const newProfessional = new ProfessionalModel({
      professionalId: userId,
      specialization,
      experience,
      description,
      skills,
      education,
      contact,
    });

    // Save the professional to the database
    const savedProfessional = await newProfessional.save();

    res.status(201).json(savedProfessional); // Respond with the saved professional
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfessionalInfo = async (req, res) => {
  const { professionalId } = req.params;
  const {
    specialization,
    experience,
    description,
    skills,
    education,
    contact,
  } = req.body;

  try {
    // Find the professional by professionalId and update their information
    const updatedProfessional = await ProfessionalModel.findOneAndUpdate(
      { professionalId: professionalId }, // Search by professionalId
      {
        specialization,
        experience,
        description,
        skills,
        education,
        contact,
      },
      { new: true }
    );

    if (!updatedProfessional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    res.status(200).json(updatedProfessional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProfessionals,
  getProfessionalById,
  addProfessionalInfo,
  updateProfessionalInfo,
};
