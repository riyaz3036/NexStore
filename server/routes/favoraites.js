const express = require('express');
const router = express.Router();
const { addVariantToFavorites, removeVariantFromFavorites, getFavoritesByUserId} = require('../controllers/FavoraitesController'); 

// Add a product to favorites
router.post('/:user_id', addVariantToFavorites);

// Remove a product from favorites
router.delete('/:user_id', removeVariantFromFavorites);

// Get favorites by user_id
router.get('/:user_id', getFavoritesByUserId);

module.exports = router;
