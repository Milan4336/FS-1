const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

dotenv.config();

const simulate = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const alice = await User.findOne({ email: 'alice@bank.com' });
    const bob = await User.findOne({ email: 'bob@bank.com' });

    if (!alice || !bob) {
        console.log('Users not found');
        process.exit(1);
    }

    console.log(`Alice Balance: ${alice.balance}, Bob Balance: ${bob.balance}`);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        console.log('Starting Transaction...');
        const s = await User.findById(alice._id).session(session);
        const r = await User.findById(bob._id).session(session);

        s.balance -= 300;
        await s.save({ session });

        r.balance += 300;
        await r.save({ session });

        await Transaction.create([{
            sender: s._id,
            receiver: r._id,
            amount: 300,
            status: 'success',
            message: 'Simulated'
        }], { session });

        await session.commitTransaction();
        console.log('Transaction COMMITTED');
    } catch (err) {
        await session.abortTransaction();
        console.error('Transaction ROLLED BACK:', err.message);
    } finally {
        session.endSession();
        mongoose.connection.close();
    }
};

simulate();
