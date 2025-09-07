// routes/product.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/product/search?query=...
router.get('/search', productController.searchProducts);

module.exports = router;