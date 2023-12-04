const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String },
    price: { type: Number },
    rate: { type: Number },
    count: { type: Number },
    colors: [],
    media: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("product", Product);
