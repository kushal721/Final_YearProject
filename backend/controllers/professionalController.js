import User from "../models/User.js";

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

export { getProfessionals, getProfessionalById };

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
