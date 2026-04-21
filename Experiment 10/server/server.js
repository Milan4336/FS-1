const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`\n--- Experiment 10: Nexus Social Hub Running ---`);
    console.log(`API Service: http://localhost:${PORT}`);
    console.log(`--------------------------------------------\n`);
});
