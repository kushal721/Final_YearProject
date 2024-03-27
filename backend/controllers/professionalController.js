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

export { getProfessionals };
