const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); 
const { createVariant, getSingleVariant, getAllVariants, updateVariant, deleteVariant,getSample} = require('../controllers/VariantController'); 

// Create a new variant with image upload
router.post('/', upload.array('images', 5), createVariant); // max limit: 5 images

// get sample data
router.get('/sample/', getSample);

// Get all variants
router.get('/', getAllVariants);

// Get a single variant
router.get('/:id', getSingleVariant);

// Update a variant with image upload
router.put('/:id', upload.array('images', 5), updateVariant);

// Delete a variant
router.delete('/:id', deleteVariant);

module.exports = router;
