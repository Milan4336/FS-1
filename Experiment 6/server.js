const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

// Init
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Static
app.use(express.static(path.join(__dirname, 'public')));

// UI Routes
app.get('/', (req, res) => res.redirect('/auth/login'));
app.get('/auth/login', (req, res) => res.render('pages/login', { error: req.query.error, success: req.query.success, user: null }));

// API & App Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/banking', require('./routes/bankingRoutes'));
app.use('/api/banking', require('./routes/bankingRoutes'));

// Global Error Handler
app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`\n--- Experiment 6 Rebuild 2.0 ---`);
    console.log(`Banking Core: http://localhost:${PORT}`);
    console.log(`---------------------------------\n`);
});
