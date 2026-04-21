const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.ObjectId, ref: 'User' }, // Can be null if deposit/rollback
    amount: { type: Number, required: true },
    type: { type: String, enum: ['transfer'], default: 'transfer' },
    status: { type: String, enum: ['success', 'rolled_back', 'failed'], default: 'success' },
    message: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
