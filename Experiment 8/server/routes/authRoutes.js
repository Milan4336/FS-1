const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

// --- RBAC Test Routes ---
router.get('/user-data', protect, (req, res) => {
    res.json({ success: true, message: 'Access granted to User data.' });
});

router.get('/moderator-panel', protect, authorize('moderator', 'admin'), (req, res) => {
    res.json({ success: true, message: 'Welcome to the Moderator Panel.' });
});

router.get('/admin-dashboard', protect, authorize('admin'), (req, res) => {
    res.json({ success: true, message: 'Full System Access: Admin Dashboard.' });
});

module.exports = router;
