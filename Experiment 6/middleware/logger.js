const logger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[BANKING-LOG] ${req.method} ${req.originalUrl} | STATUS: ${res.statusCode} | ${duration}ms`);
    });
    next();
};

module.exports = logger;
