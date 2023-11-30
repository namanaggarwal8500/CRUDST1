const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../models/productModel');

// Add Review to Product
router.post('/', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.reviews.push(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Reviews for Product with Pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const product = await Product.findById(req.params.productId);
    const reviews = product.reviews
      .slice((page - 1) * pageSize, page * pageSize);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Review in Product
router.put('/:reviewId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const review = product.reviews.id(req.params.reviewId);
    review.set(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Review in Product
router.delete('/:reviewId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    product.reviews.id(req.params.reviewId).remove();
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
