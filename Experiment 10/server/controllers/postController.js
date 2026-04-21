const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name role')
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'name' }
            })
            .sort('-createdAt');
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        req.body.author = req.user.id;
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        
        // Ownership check
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
        }

        await post.deleteOne();
        res.status(200).json({ success: true, message: 'Post removed' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        if (post.likes.includes(req.user.id)) {
            post.likes.pull(req.user.id);
        } else {
            post.likes.push(req.user.id);
        }

        await post.save();
        res.status(200).json({ success: true, likes: post.likes });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// --- Comment Logic (Level 2) ---

exports.addComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            text: req.body.text,
            author: req.user.id,
            post: req.params.id
        });
        res.status(201).json({ success: true, data: comment });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
