// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {   
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String,
  },
  qty: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    default: "E-Corn Store", // dynamic seller per product
  },
  shippingCharge: {
    type: Number,
    default: 83, // dynamic shipping per product
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
