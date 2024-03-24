import mongoose from "mongoose";

const Schema = mongoose.Schema;
// review model

const reviewSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user required"],
    },
  },
  { timestamps: true }
);

//design model
const designSchema = new Schema(
  {
    designName: {
      type: String,
      require: true,
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
      require: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Design = mongoose.model("Designs", designSchema);

export default Design; // Export the Design model as default
