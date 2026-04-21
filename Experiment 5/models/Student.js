const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    name: { type: String, required: [true, 'Name is required'] },
    age: { type: Number, min: 16 },
    email: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    course: { type: String, required: true, enum: ['Computer Science', 'Electronic Engineering', 'Business Admin'] }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
