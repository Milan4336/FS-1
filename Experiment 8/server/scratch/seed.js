const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Clean existing
        await User.deleteMany({});

        // Create Users
        await User.create([
            { name: 'Admin User', email: 'admin@hub.com', password: 'password123', role: 'admin' },
            { name: 'Mod User', email: 'mod@hub.com', password: 'password123', role: 'moderator' },
            { name: 'Regular User', email: 'user@hub.com', password: 'password123', role: 'user' }
        ]);

        console.log('--- SEED SUCCESSFUL ---');
        console.log('Admin: admin@hub.com / password123');
        console.log('Mod: mod@hub.com / password123');
        console.log('User: user@hub.com / password123');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
