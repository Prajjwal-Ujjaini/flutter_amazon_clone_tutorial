import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  description: {
    required: true,
    type: String,
    trim: true,
  },
  images: [
    {
      required: true,
      type: String,
    },
  ],
  quantity: {
    required: true,
    type: Number,
    trim: true,
  },
  price: {
    required: true,
    type: Number,
    trim: true,
  },
  category: {
    required: true,
    type: String,
    trim: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
