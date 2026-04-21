const express = require('express');
const { getDashboard, performTransfer } = require('../controllers/bankingController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', protect, getDashboard);
router.post('/transfer', protect, performTransfer);

module.exports = router;
