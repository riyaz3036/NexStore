const Favoraites = require('../models/Favoraites'); 
const mongoose = require('mongoose');

// Toggle a product to favorites
const addVariantToFavorites = async (req, res) => {
  try {
    const { variant_id } = req.body;
    const { user_id } = req.params;

    // Validate required fields
    if (!variant_id) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Find or create the favorites list for the user
    let favorites = await Favoraites.findOne({ user_id });
    if (!favorites) {
      favorites = new Favoraites({ user_id, variants: [] });
    }

    // Check if the variant is already in the favorites list
    const existingVariant = favorites.variants.find(p => p.toString() === variant_id);
    if (!existingVariant) {
      // Add new variant to the favorites list
      favorites.variants.push(variant_id);
    }

    await favorites.save();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a product from favorites
const removeVariantFromFavorites = async (req, res) => {
  try {
    const { variant_id } = req.body;
    const { user_id } = req.params;

    // Validate required fields
    if (!variant_id) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Find the favorites list for the user
    const favorites = await Favoraites.findOne({ user_id });
    if (!favorites) {
      return res.status(404).json({ success: false, message: 'Favorites list not found' });
    }

    // Remove the variant from the favorites list
    favorites.variants = favorites.variants.filter(p => p.toString() !== variant_id);
    await favorites.save();

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get favorites by user_id
const getFavoritesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Validate required field
    if (!user_id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Find the favorites list for the user
    const favorites = await Favoraites.findOne({ user_id })
      .populate({
        path: 'variants',
        populate: {
          path: 'product_id',
          populate: {
            path: 'category_id', // Populate category_id inside product_id
            select: 'name' // Adjust this based on the fields you want to include in the response
          }
        }
      });

    if (!favorites) {
      return res.status(404).json({ success: false, message: 'Favorites list not found' });
    }

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  addVariantToFavorites,
  removeVariantFromFavorites,
  getFavoritesByUserId,
};
