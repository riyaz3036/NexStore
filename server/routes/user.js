const express = require('express');
const { updateUser, deleteUser, getAllUsers, getUser} = require('../controllers/UserController');
const upload = require('../config/multerConfig');
const { verifyUser, verifyAdmin } = require('../verifyToken/verifyToken');


const router = express.Router();

// Get a user
router.get('/:id', getUser);

// Update a user with optional profile picture upload
router.put('/:id', upload.single('image'), updateUser);

// Delete a user and related bookings
router.delete('/:id', deleteUser);

// Get all users
router.get('/', getAllUsers);


module.exports = router;
