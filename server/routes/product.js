const express = require('express');
const router = express.Router();
const { createProduct, getSingleProduct, getAllProducts, updateProduct, deleteProduct} = require('../controllers/ProductController'); 
const { verifyUser, verifyAdmin } = require('../verifyToken/verifyToken');

// Create a new product
router.post('/', createProduct);

// Get a single product
router.get('/:id', getSingleProduct);

// Get all products
router.get('/', getAllProducts);

// Update a product
router.put('/:id',updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
