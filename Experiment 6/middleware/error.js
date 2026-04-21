const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR-HUB] ${err.message}`);

    let error = { ...err };
    error.message = err.message;

    // Mongoose duplicate key
    if (err.code === 11000) {
        error.message = 'User already exists with this email.';
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors).map(val => val.message);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
