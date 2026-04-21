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
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = 3008;
app.listen(PORT, () => {
    console.log(`\n--- Experiment 8: Secure RBAC Hub Running ---`);
    console.log(`Auth Service: http://localhost:${PORT}`);
    console.log(`--------------------------------------------\n`);
});
