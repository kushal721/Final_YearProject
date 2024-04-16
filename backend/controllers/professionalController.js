import UserModel from "../models/User.js";

import ProfessionalModel from "../models/Professional.js";


// Controller function to get all users
const getAllProfessionals = async (req, res) => {
  try {
    // Find users with role "professional"
    const professionals = await UserModel.find({ role: "professional" });

    if (!professionals || professionals.length === 0) {
      return res.status(404).json({ message: "No professionals found" });
    }

    res.status(200).json(professionals);
  } catch (error) {
    console.error("Error fetching professionals:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to get a professional by ID
const getProfessionalById = async (req, res) => {
  try {
    // Extract the professional ID from the request parameters
    const { professionalId } = req.params;

    // Query the database to find the professional by ID
    const professional = await UserModel.findById(professionalId);

    // If the professional is not found, return a 404 error
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // If the professional is found, return it in the response
    res.status(200).json(professional);
  } catch (error) {
    // If an error occurs, return a 500 error with the error message
    console.error("Error fetching professional:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// // Controller function to get a professional by professionalId
// const getProfessionalById = async (req, res) => {
//   const { professionalId } = req.params; // Get the professionalId from the request parameters

//   try {
//     const professional = await UserModel.findOne({
//       professionalId,
//     });

//     if (!professional) {
//       return res.status(404).json({ message: "Professional not found" });
//     }

//     res.status(200).json(professional); // Send the professional data if found
//   } catch (error) {
//     console.error("Error getting professional by professionalId:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

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
// Controller to get a professional by ID
// const getProfessionalByProfessionalId = async (req, res) => {
//   try {
//     // Extract the professional ID from the request parameters
//     const { professionalId } = req.params;

//     // Query the ProfessionalModel to find the professional by ID
//     const professional = await UserModel.findById(professionalId)
//       // Populate the 'user' field to get the personal details from the user model
//       .populate("specialization", "experience");

//     // If the professional is not found, return a 404 error
//     if (!professional) {
//       return res.status(404).json({ message: "Professional not found" });
//     }

//     // If the professional is found, return it in the response
//     res.status(200).json(professional);
//   } catch (error) {
//     // If an error occurs, return a 500 error with the error message
//     console.error("Error fetching professional:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// Controller function to get a professional by professionalId
const getProfessionalByProfessionalId = async (req, res) => {
  const { professionalId } = req.params; // Get the professionalId from the request parameters

  try {
    const professional = await ProfessionalModel.findOne({
      professionalId,
    });

    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    res.status(200).json(professional); // Send the professional data if found
  } catch (error) {
    console.error("Error getting professional by professionalId:", error);
    res.status(500).json({ message: "Server Error" });
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
  getAllProfessionals,
  getProfessionalById,
  getProfessionalByProfessionalId,
  addProfessionalInfo,
  updateProfessionalInfo,
};
