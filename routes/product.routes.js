const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

// ✅ Get all products
router.get('/', productController.getAllProducts);

// ✅ Get products by category (PUT THIS BEFORE :id)
router.get('/category/:categoryId', productController.getProductsByCategory);

// ✅ Get product by ID (KEEP THIS LAST)
router.get('/:id', productController.getProductById);

// ✅ Create product
router.post('/', upload.single('image'), productController.createProduct);

// ✅ Update product
router.put('/:id', upload.single('image'), productController.updateProductById);

// ✅ Delete product
router.delete('/:id', productController.deleteProductById);

module.exports = router;
