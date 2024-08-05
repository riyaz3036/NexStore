const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// Add a variant to the cart
const addVariantToCart = async (req, res) => {
  try {
    const { variant_id, quantity } = req.body;
    const { user_id } = req.params;

    // Validate required fields
    if (!variant_id || quantity == null) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Find or create the cart for the user
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = new Cart({ user_id, variants: [] });
    }

    // Check if the variant already exists in the cart
    const existingVariant = cart.variants.find(v => v.variant_id.toString() === variant_id);
    if (existingVariant) {
      // Add the quantity if the variant already exists
      existingVariant.quantity += quantity;
    } else {
      // Add new variant to the cart
      cart.variants.push({ variant_id, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a variant from the cart
const removeVariantFromCart = async (req, res) => {
  try {
    const { variant_id } = req.body;
    const { user_id } = req.params;

    // Validate required fields
    if (!variant_id) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Remove the variant from the cart
    cart.variants = cart.variants.filter(v => v.variant_id.toString() !== variant_id);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get cart by user_id
const getCartByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Validate required field
    if (!user_id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Find the cart for the user and populate nested fields
    const cart = await Cart.findOne({ user_id })
      .populate({
        path: 'variants.variant_id',
        populate: {
          path: 'product_id',
          populate: {
            path: 'category_id', // Populate category_id inside product_id
            select: 'name' // Adjust based on the fields you want to include
          }
        }
      });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update variant quantity in the cart
const updateVariantQuantityInCart = async (req, res) => {
  try {
    const { variant_id, quantity } = req.body;
    const { user_id } = req.params;

    // Validate required fields
    if (!variant_id || quantity == null) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Check if the variant exists in the cart
    const existingVariant = cart.variants.find(v => v.variant_id.toString() === variant_id);
    if (!existingVariant) {
      return res.status(404).json({ success: false, message: 'Variant not found in the cart' });
    }

    // Update the quantity of the variant
    existingVariant.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addVariantToCart,
  removeVariantFromCart,
  getCartByUserId,
  updateVariantQuantityInCart
};
