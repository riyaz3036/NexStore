const express = require('express');
const router = express.Router();
const {createCategory, singleCategory, allCategories, updateCategory, deleteCategory} = require('../controllers/CategoryController'); 

// Create a new category
router.post('/', createCategory);

// Get all categories
router.get('/', allCategories);

// Get a single category by ID
router.get('/:id', singleCategory);

// Update a category by ID
router.put('/:id', updateCategory);

// Delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
