const User = require('../models/User');

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        httpOnly: true
    };
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide email and password' });

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getMe = async (req, res) => {
    res.status(200).json({ success: true, user: req.user });
};

exports.logout = (req, res) => {
    res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// --- Todo Logic (Level 1 CRUD Built-in) ---

exports.addTodo = async (req, res) => {
    try {
        req.user.todos.push({ text: req.body.text });
        await req.user.save();
        res.status(200).json({ success: true, todos: req.user.todos });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.toggleTodo = async (req, res) => {
    try {
        const todo = req.user.todos.id(req.params.id);
        if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
        todo.completed = !todo.completed;
        await req.user.save();
        res.status(200).json({ success: true, todos: req.user.todos });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        req.user.todos.pull(req.params.id);
        await req.user.save();
        res.status(200).json({ success: true, todos: req.user.todos });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
