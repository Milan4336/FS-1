const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    // Get token from cookie
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.redirect('/auth/login?error=Session required. Please login.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.redirect('/auth/login?error=User record invalid.');
        }

        res.locals.user = req.user; // For EJS templates
        next();
    } catch (err) {
        return res.redirect('/auth/login?error=Invalid session. Please login again.');
    }
};
