const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getDashboard = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ sender: req.user.id }, { receiver: req.user.id }]
        }).populate('sender receiver', 'name').sort({ createdAt: -1 });

        res.render('pages/dashboard', { 
            user: req.user, 
            userId: req.user.id,
            transactions 
        });
    } catch (err) {
        res.render('pages/login', { error: err.message, success: null });
    }
};

exports.performTransfer = async (req, res) => {
    const { receiverEmail, amount } = req.body;
    const transferAmount = parseFloat(amount);

    if (!transferAmount || transferAmount <= 0) {
        return res.status(400).json({ success: false, error: 'Invalid amount' });
    }

    // ACID Transaction Start
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const sender = await User.findById(req.user.id).session(session);
        if (sender.balance < transferAmount) throw new Error('Insufficient Funds');

        const receiver = await User.findOne({ email: receiverEmail }).session(session);
        if (!receiver) throw new Error('Receiver account not found');
        if (sender.id === receiver.id) throw new Error('Cannot transfer to self');

        // Deduct
        sender.balance -= transferAmount;
        await sender.save({ session });

        // Credit
        receiver.balance += transferAmount;
        await receiver.save({ session });

        // Audit Log
        await Transaction.create([{
            sender: sender._id,
            receiver: receiver._id,
            amount: transferAmount,
            status: 'success',
            message: `ACID-Verified Transfer Successful`
        }], { session });

        // COMMIT
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: 'Transfer successful' });

    } catch (err) {
        // ROLLBACK
        await session.abortTransaction();
        session.endSession();

        // Failed Audit (Outside transaction)
        await Transaction.create({
            sender: req.user.id,
            receiver: null,
            amount: transferAmount,
            status: 'rolled_back',
            message: `Rollback: ${err.message}`
        });

        res.status(400).json({ success: false, error: err.message });
    }
};
