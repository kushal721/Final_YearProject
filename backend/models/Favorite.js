// Import Mongoose
import mongoose from "mongoose";

// Define the favorites schema
const favoritesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    designId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Favorites model
const Favorite = mongoose.model("Favorites", favoritesSchema);

export default Favorite;
