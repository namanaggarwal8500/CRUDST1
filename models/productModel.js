const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  content: { type: String, required: true, maxlength: 500 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new Schema({
  name: { type: String, required: true, maxlength: 255 },
  description: { type: String, required: true, maxlength: 1000 },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  reviews: [reviewSchema],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
