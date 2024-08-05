const Order = require('../models/Order'); 
const Cart = require('../models/Cart')
const mongoose = require('mongoose');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user_id, payment_mode, total, address } = req.body;

    // Validate required fields
    if (!user_id || !payment_mode || !total || !address) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Retrieve the user's cart
    const cart = await Cart.findOne({ user_id });

    if (!cart || cart.variants.length === 0) {
      return res.status(404).json({ success: false, message: 'No items in the cart' });
    }

    // Create a new order with the variants from the cart
    const newOrder = new Order({
      user_id,
      variants: cart.variants,
      payment_mode,
      total,
      address,
    });

    await newOrder.save();

    // Optionally, you can clear the cart after creating the order
    cart.variants = [];
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single order by ID
const singleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Order ID' });
    }

    const order = await Order.findById(id).populate('user_id').populate('variants.variant_id');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders
const allOrders = async (req, res) => {
  const { user_id } = req.params;

  try {
    const orders = await Order.find({ user_id: new mongoose.Types.ObjectId(user_id) })
      .populate('user_id')
      .populate({
        path: 'variants.variant_id',
        populate: {
          path: 'product_id',
          model: 'Product' // Adjust to your actual Product model name
        }
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an order by ID
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Order ID' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true }).populate('user_id').populate('variants.variant_id');
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Order ID' });
    }

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  singleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
};
