const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Product price is required"]
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      default: 0
    },
    category: {
      type: String,
      required: [true, "Product category is required"]
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"]
  }},
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);