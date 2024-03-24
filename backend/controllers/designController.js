import Design from "../models/Design.js"; // Import Design model using ES module syntax
import mongoose from "mongoose";

//public view

// Get all designs
const getDesigns = async (req, res) => {
  const designs = await Design.find({}).sort({ createdAt: -1 });

  res.status(200).json(designs);
};

//get a single design
const getDesign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such design" });
  }

  const design = await Design.findById(id);
  if (!design) {
    return res.status(404).json({ error: "No such design" });
  }

  res.status(200).json(design);
};

//delete a workout
const deleteDesign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such design" });
  }

  const design = await Design.findOneAndDelete({ _id: id });

  if (!design) {
    return res.status(404).json({ error: "No such design" });
  }

  res.status(200).json(design);
};

// Professional side

// Add new designs
const addDesigns = async (req, res) => {
  const { designName, area, estimateCost, designDescription } = req.body;
  console.log(req.body);

  let emptyFields = [];

  if (!designName) {
    emptyFields.push("designName");
  }
  if (!area) {
    emptyFields.push("area");
  }
  if (!estimateCost) {
    emptyFields.push("estimateCost");
  }
  if (!designDescription) {
    emptyFields.push("designDescription");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add document to the database
  try {
    const design = await Design.create({
      designName,
      area,
      estimateCost,
      designDescription,
    });
    res.status(200).json(design);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all designs
const getMyDesigns = async (req, res) => {
  const designs = await Design.find({}).sort({ createdAt: -1 });

  res.status(200).json(designs);
};

//get a single design
const getMyDesign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such design" });
  }

  const design = await Design.findById(id);
  if (!design) {
    return res.status(404).json({ error: "No such design" });
  }

  res.status(200).json(design);
};

//delete a workout
const deleteMyDesign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such design" });
  }

  const design = await Design.findOneAndDelete({ _id: id });

  if (!design) {
    return res.status(404).json({ error: "No such design" });
  }

  res.status(200).json(design);
};

//update a design
const updateMyDesign = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such design" });
  }

  const design = await Design.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!design) {
    return res.status(404).json({ error: "No such design" });
  }

  res.status(200).json(design);
};
const productReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    // Check if user is authenticated
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User is not authenticated" });
    }

    // Find design
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res
        .status(404)
        .json({ success: false, message: "Design not found" });
    }

    // Create review object
    const review = {
      name: req.user.userName, // Assuming userName is the correct property for the user's name
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    // Add review to design's reviews array
    design.reviews.push(review);

    // Update number of reviews
    design.numReviews = design.reviews.length;

    // Calculate average rating
    const totalRating = design.reviews.reduce(
      (acc, item) => acc + item.rating,
      0
    );
    design.rating = totalRating / design.reviews.length;

    // Save design
    await design.save();

    res
      .status(200)
      .json({ success: true, message: "Review added successfully", design });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  addDesigns,
  getDesigns,
  getDesign,
  getMyDesigns,
  getMyDesign,
  deleteMyDesign,
  updateMyDesign,
  productReview,
};
