const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 5.1 Basic CRUD
router.get('/crud', productController.getCRUD);

// 5.3 Advanced Analytics
router.get('/analytics', productController.getAnalytics);

// Actions
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);

// Default redirect
router.get('/', (req, res) => res.redirect('/products/crud'));

module.exports = router;
