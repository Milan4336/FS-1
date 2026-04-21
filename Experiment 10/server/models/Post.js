const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    image: { type: String }, // Optional image URL
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Cascade delete comments when a post is deleted
PostSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    await this.model('Comment').deleteMany({ post: this._id });
    next();
});

// Reverse populate with virtuals
PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    justOne: false
});

module.exports = mongoose.model('Post', PostSchema);
