const Favoraites = require('../models/Favoraites');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');


// Get a single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (req.file) {
      user.image = req.file.path; 
    }
    
    // Update user information
    if (req.body.role) {
      user.role = req.body.role;
    }
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;  
    }
    if (req.body.phone) {
      user.phone = req.body.phone;
    }
    if (req.body.membership) {
      user.membership = req.body.membership;
    }
    
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find and delete all orders by this user
    await Order.deleteMany({ user_id: id });
    // Find and delete cart by this user
    await Cart.deleteMany({ user_id: id });
    // Find and delete favoraites by this user
    await Favoraites.deleteMany({ user_id: id });

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User and their bookings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser
};
