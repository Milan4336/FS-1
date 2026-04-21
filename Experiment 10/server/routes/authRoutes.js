const express = require('express');
const { register, login, getMe, logout, addTodo, toggleTodo, deleteTodo } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

// Todos (Level 1)
router.post('/todos', protect, addTodo);
router.put('/todos/:id', protect, toggleTodo);
router.delete('/todos/:id', protect, deleteTodo);

module.exports = router;
