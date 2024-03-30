// import Design from "../models/Design.js"; // Ensure correct path for Design model
// import mongoose from "mongoose";

// // Get all designs
// const getDesigns = async (req, res) => {
//   try {
//     const designs = await Design.find({}).sort({ createdAt: -1 });
//     res.status(200).json(designs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // // Get all designs (for the logged-in user)
// // const getMyDesigns = async (req, res) => {
// //   try {
// //     const designs = await Design.find({ user_id: req.user._id }).sort({
// //       createdAt: -1,
// //     });
// //     res.status(200).json(designs);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// const getMyDesigns = async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     const user_id = req.user._id;
//     console.log(user_id);
//     const designs = await Design.find({ user_id }).sort({ createdAt: -1 });
//     res.status(200).json(designs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get a single design
// const getDesign = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "No such dehiugsign" });
//     }
//     const design = await Design.findById(id);
//     if (!design) {
//       return res.status(404).json({ error: "No such desjjjjign" });
//     }
//     res.status(200).json(design);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete a design
// const deleteDesign = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     const design = await Design.findOneAndDelete({ _id: id });
//     if (!design) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     res.status(200).json(design);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Add new designs
// const addDesigns = async (req, res) => {
//   try {
//     // Check if user is authenticated
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     const { designName, area, estimateCost, designDescription } = req.body;

//     if (!designName || !area || !estimateCost || !designDescription) {
//       return res.status(400).json({ error: "Please fill in all the fields" });
//     }

//     const design = await Design.create({
//       designName,
//       area,
//       estimateCost,
//       designDescription,
//       user_id: req.user._id,
//     });
//     res.status(200).json(design);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get a single design (for the logged-in user)
// const getMyDesign = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     const design = await Design.findOne({ _id: id, user_id: req.user._id });
//     if (!design) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     res.status(200).json(design);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete a design (for the logged-in user)
// const deleteMyDesign = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     const design = await Design.findOneAndDelete({
//       _id: id,
//       user_id: req.user._id,
//     });
//     if (!design) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     res.status(200).json(design);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update a design (for the logged-in user)
// const updateMyDesign = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     const design = await Design.findOneAndUpdate(
//       { _id: id, user_id: req.user._id },
//       req.body,
//       { new: true }
//     );
//     if (!design) {
//       return res.status(404).json({ error: "No such design" });
//     }
//     res.status(200).json(design);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Add product review
// const productReview = async (req, res) => {
//   try {
//     const { comment, rating } = req.body;

//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User is not authenticated" });
//     }

//     const design = await Design.findById(req.params.id);
//     if (!design) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Design not found" });
//     }

//     const review = {
//       name: req.user.userName,
//       rating: Number(rating),
//       comment: comment,
//       user: req.user._id,
//     };

//     design.reviews.push(review);
//     design.numReviews = design.reviews.length;

//     const totalRating = design.reviews.reduce(
//       (acc, item) => acc + item.rating,
//       0
//     );
//     design.rating = totalRating / design.reviews.length;

//     await design.save();

//     res
//       .status(200)
//       .json({ success: true, message: "Review added successfully", design });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export {
//   addDesigns,
//   getDesigns,
//   getDesign,
//   getMyDesigns,
//   getMyDesign,
//   deleteMyDesign,
//   updateMyDesign,
//   productReview,
// };

import Design from "../models/Design.js"; // Ensure correct path for Design model
import mongoose from "mongoose";

// Get all designs
const getDesigns = async (req, res) => {
  try {
    const designs = await Design.find({}).sort({ createdAt: -1 });
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all designs (for the logged-in user)
const getMyDesigns = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user_id = req.user._id;
    console.log("user id", user_id);

    console.log(user_id);
    const designs = await Design.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 
};

// Get a single design
const getDesign = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const design = await Design.findById(id);
    if (!design) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a design
const deleteDesign = async (req, res) => {
  const { id } = req.params;
  try {
    const design = await Design.findOneAndDelete({ _id: id });
    if (!design) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new designs
const addDesigns = async (req, res) => {
  try {
    const { designName, area, estimateCost, designDescription } = req.body;

    if (!designName || !area || !estimateCost || !designDescription) {
      return res.status(400).json({ error: "Please fill in all the fields" });
    }

    const design = await Design.create({
      designName,
      area,
      estimateCost,
      designDescription,
      user_id: req.user._id,
    });
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single design by the logged-in user
const getMyDesign = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const design = await Design.findOne({ _id: id, user_id: req.user._id });
    if (!design) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a design by the logged-in user
const deleteMyDesign = async (req, res) => {
  const { id } = req.params;
  try {
    const design = await Design.findOneAndDelete({
      _id: id,
      user_id: req.user._id,
    });
    if (!design) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a design by the logged-in user
const updateMyDesign = async (req, res) => {
  const { id } = req.params;
  try {
    const design = await Design.findOneAndUpdate(
      { _id: id, user_id: req.user._id },
      req.body,
      { new: true }
    );
    if (!design) {
      return res.status(404).json({ error: "Design not found" });
    }
    res.status(200).json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add product review
const productReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User is not authenticated" });
    }

    const design = await Design.findById(req.params.id);
    if (!design) {
      return res
        .status(404)
        .json({ success: false, message: "Design not found" });
    }

    const review = {
      name: req.user.userName,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    design.reviews.push(review);
    design.numReviews = design.reviews.length;

    const totalRating = design.reviews.reduce(
      (acc, item) => acc + item.rating,
      0
    );
    design.rating = totalRating / design.reviews.length;

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
