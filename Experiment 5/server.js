const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Set EJS and Layouts before static/routes
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // Master layout: views/layout.ejs

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// DB Connection
connectDB();

// Global View Locals
app.use((req, res, next) => {
    res.locals.page = req.path.split('/')[1] || 'students';
    next();
});

// Routes
app.use('/students', require('./routes/studentRoutes'));
app.use('/products', require('./routes/productRoutes'));

// Redirect Home
app.get('/', (req, res) => res.redirect('/students'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n--- Experiment 5 (Build 2.0) ---`);
    console.log(`Server running: http://localhost:${PORT}`);
    console.log(`--------------------------------\n`);
});
