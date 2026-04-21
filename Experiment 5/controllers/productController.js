const Product = require('../models/Product');

// Sub 5.1: Basic CRUD View
exports.getCRUD = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.render('pages/crud', { 
            products, 
            sub: '5.1', 
            error: req.query.error, 
            success: req.query.success 
        });
    } catch (err) {
        res.render('pages/crud', { products: [], sub: '5.1', error: err.message, success: null });
    }
};

// Sub 5.3: Advanced Analytics & Stock
exports.getAnalytics = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        // Aggregation Pipeline
        const statsArray = await Product.aggregate([
            {
                $project: {
                    totalStock: { $sum: "$variants.stock" },
                    avgRating: { $avg: "$reviews.rating" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCatalogStock: { $sum: "$totalStock" },
                    avgCatalogRating: { $avg: "$avgRating" },
                    bestRating: { $max: "$avgRating" }
                }
            }
        ]);

        const stats = statsArray[0] || { totalCatalogStock: 0, avgCatalogRating: 0, bestRating: 0 };

        res.render('pages/analytics', { 
            products, 
            stats, 
            sub: '5.3', 
            error: null, 
            success: req.query.success 
        });
    } catch (err) {
        res.render('pages/analytics', { products: [], stats: {}, sub: '5.3', error: err.message, success: null });
    }
};

// Actions
exports.addProduct = async (req, res) => {
    try {
        const { name, basePrice, category, sku, size, color, stock } = req.body;
        const redirectPath = req.body.from === 'analytics' ? '/products/analytics' : '/products/crud';
        
        await Product.create({
            name, basePrice, category, sku,
            variants: [{ size, color, stock: parseInt(stock) }]
        });
        
        res.redirect(`${redirectPath}?success=Product Created`);
    } catch (err) {
        const redirectPath = req.body.from === 'analytics' ? '/products/analytics' : '/products/crud';
        res.redirect(`${redirectPath}?error=${err.message}`);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const redirectPath = req.query.from === 'analytics' ? '/products/analytics' : '/products/crud';
        await Product.findByIdAndDelete(req.params.id);
        res.redirect(`${redirectPath}?success=Product Removed`);
    } catch (err) {
        res.redirect(`/products/crud?error=${err.message}`);
    }
};
