const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');


router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;
    const products = await Product.find()
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
