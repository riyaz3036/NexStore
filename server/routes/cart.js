const express = require('express');
const router = express.Router();
const { addVariantToCart, removeVariantFromCart, getCartByUserId,updateVariantQuantityInCart} = require('../controllers/CartController'); 

// Add a variant to the cart
router.post('/:user_id', addVariantToCart);

// Remove a variant from the cart
router.delete('/:user_id', removeVariantFromCart);

// Get cart by user_id
router.get('/:user_id', getCartByUserId);

// Update cart quantity by user_id
router.put('/:user_id', updateVariantQuantityInCart);

module.exports = router;
