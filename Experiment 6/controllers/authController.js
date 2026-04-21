const User = require('../models/User');

// Helper to send JWT in Cookie
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        httpOnly: true
    };
    res.status(statusCode).cookie('token', token, options).json({ success: true, token });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, error: 'Enter email and password' });

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid Credentials' });
        }
        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.logout = (req, res, next) => {
    res.cookie('token', 'none', { expires: new Date(Date.now() + 5000), httpOnly: true });
    res.redirect('/auth/login?success=Logged out successfully');
};
