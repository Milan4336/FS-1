const mongoose = require('mongoose');

// Nested Schemas
const ReviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
}, { timestamps: true });

const VariantSchema = new mongoose.Schema({
    size: { type: String, required: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 }
});

// Main Product Schema
const ProductSchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true, index: true },
    basePrice: { type: Number, required: true },
    category: { type: String, required: true },
    variants: [VariantSchema],
    reviews: [ReviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
