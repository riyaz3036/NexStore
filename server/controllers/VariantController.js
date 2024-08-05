const mongoose = require('mongoose');
const Variant = require('../models/Variant'); 
const Product = require('../models/Product')
const Category = require('../models/Category')

// Create a new variant with image upload
const createVariant = async (req, res) => {
  try {
    const { product_id, name, description, price, offer_price } = req.body;

    // If files are uploaded, handle them
    const images = req.files ? req.files.map(file => file.path) : [];

    const newVariant = new Variant({
      product_id,
      name,
      description,
      images,
      price,
      offer_price
    });

    await newVariant.save();
    res.status(201).json(newVariant);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single variant
const getSingleVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await Variant.findById(id).populate('product_id');

    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }

    const productVariants = await Variant.find({ product_id: variant.product_id._id })
      .select('_id name');

    const productWithVariants = {
      ...variant.product_id.toObject(), 
      variants: productVariants
    };

    res.status(200).json({
      ...variant.toObject(),
      product_id: productWithVariants
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all variants
const getAllVariants = async (req, res) => {
  try {
    const { sort, category, best_seller, page } = req.query;

    const pageSize = 12;
    const skip = (page?(page - 1):0) * pageSize;
 

    // To filter products based on best seller and category
    let productQuery = {};
    if (best_seller === 'true') {
      productQuery.best_seller = true;
    }
    if (category) {
      // Handle multiple category IDs separated by commas
      const categoryIds = category.split(',').map(id => id.trim());
      // Convert to MongoDB ObjectId format
      const objectIds = categoryIds.map(id => new mongoose.Types.ObjectId(id));
      productQuery.category_id = { $in: objectIds };
    }

    const products = await Product.find(productQuery).select('_id');
    const productIds = products.map(product => product._id);

    let query = { product_id: { $in: productIds } };

    // Object to handle sorting
    let sortOption = {};
    if (sort) {
      if (sort === 'HIGH_LOW') {
        sortOption.offer_price = -1;
      } else if (sort === 'LOW_HIGH') {
        sortOption.offer_price = 1;
      }
    }
    
    
    const variants = await Variant.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize)
      .populate('product_id');

    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




   


// Update a variant with image upload
const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If files are uploaded, handle them
    if (req.files) {
      updateData.images = req.files.map(file => file.path);
    }

    const updatedVariant = await Variant.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedVariant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }

    res.status(200).json(updatedVariant);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a variant
const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findById(id);

    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }

    await Variant.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Variant deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//To get sample data
const getSample = async (req, res) => {
  try {
    const categories = await Category.find();
    const sampleData = [];

    for (const category of categories) {
      const products = await Product.find({ category_id: category._id }).select('_id');
      const productIds = products.map(product => product._id);

      const variants = await Variant.find({ product_id: { $in: productIds } })
        .limit(2)
        .populate({
          path: 'product_id', 
          populate: {
            path: 'category_id', 
            model: 'Category' 
          }
        });

      sampleData.push({
        category_id: category._id,
        category_name: category.name,
        variants,
      });
    }

    res.status(200).json(sampleData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createVariant,
  getSingleVariant,
  getAllVariants,
  updateVariant,
  deleteVariant,
  getSample
};
