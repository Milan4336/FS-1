const express = require('express');
const { getPosts, createPost, deletePost, toggleLike, addComment } = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);

module.exports = router;
