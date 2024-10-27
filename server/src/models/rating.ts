import mongoose from "mongoose";

export const ratingSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  rating: {
    required: true,
    type: Number,
  },
});
