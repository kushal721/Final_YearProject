import mongoose from "mongoose";

const Schema = mongoose.Schema;



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
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Design = mongoose.model("Designs", designSchema);

export default Design; // Export the Design model as default
