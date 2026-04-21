const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Wipe all
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        // 1. Create Users
        const users = await User.create([
            { 
                name: 'Commander Shepard', 
                email: 'shepard@nexus.io', 
                password: 'password123', 
                role: 'admin',
                todos: [
                    { text: 'Verify Citadel Security', completed: true },
                    { text: 'Calibrate Main Battery', completed: false }
                ]
            },
            { 
                name: 'Garrus Vakarian', 
                email: 'garrus@nexus.io', 
                password: 'password123', 
                role: 'user',
                todos: [
                    { text: 'Spotting for Shepard', completed: true }
                ]
            }
        ]);

        // 2. Create Posts
        const post1 = await Post.create({
            content: 'The Nexus is officially operational. All systems are green. Transmitting status to all sectors.',
            author: users[0]._id
        });

        const post2 = await Post.create({
            content: 'Calibration complete. Does anyone have a spare thermal clip?',
            author: users[1]._id
        });

        // 3. Create Interactions
        await Comment.create({
            text: 'I could use a thermal clip too, Garrus.',
            author: users[0]._id,
            post: post2._id
        });

        post1.likes.push(users[1]._id);
        await post1.save();

        console.log('--- NEXUS SOCIAL SEED SUCCESSFUL ---');
        console.log('Shepard: shepard@nexus.io / password123');
        console.log('Garrus: garrus@nexus.io / password123');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
