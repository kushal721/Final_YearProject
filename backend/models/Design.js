// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const ratingSchema = new Schema({
//   rating: {
//     type: Number,
//     required: true,
//   },
//   client_id: {
//     type: String,
//     required: true,
//   },
// });

// //design model
// const designSchema = new Schema(
//   {
//     designName: {
//       type: String,
//       require: true,
//     },
//     area: {
//       type: Number,
//       required: true,
//     },
//     estimateCost: {
//       type: Number,
//       required: true,
//     },
//     designDescription: {
//       type: String,
//       require: true,
//     },
//     user_id: {
//       type: String,
//       required: true,
//     },
//     // ratings: [
//     //   {
//     //     star: Number,
//     //     postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     //   },
//     // ],
//     // totalrating: {
//     //   type: String,
//     //   default: 0,
//     // },
//   },
//   { timestamps: true }
// );

// const Design = mongoose.model("Designs", designSchema);

// export default Design; // Export the Design model as default
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define a sub-schema for ratings
const ratingSchema = new Schema(
  {
    value: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    ratedBy: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Design model
const designSchema = new Schema(
  {
    designName: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    estimateCost: {
      type: Number,
      required: true,
    },
    designDescription: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    ratings: [ratingSchema], // Add ratings field to store multiple ratings
    totalRatings: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Design = mongoose.model("Designs", designSchema);

export default Design;
