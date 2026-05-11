const express = require('express');
const { recommendCrop } = require('../controllers/cropController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/recommend', protect, recommendCrop);

module.exports = router;
