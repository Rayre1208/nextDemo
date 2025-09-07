// routes/pagination.js
const express = require('express');
const router = express.Router();
const paginationController = require('../controllers/paginationController');

// GET /api/pagination
router.get('/', paginationController.getPaginatedProducts);

module.exports = router;