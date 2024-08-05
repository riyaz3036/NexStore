const express = require('express');
const router = express.Router();
const { createOrder, singleOrder, allOrders, updateOrder, deleteOrder} = require('../controllers/OrderController'); 

// Create a new order
router.post('/', createOrder);

// Get all orders of user
router.get('/user/:user_id', allOrders);

// Get a single order by ID
router.get('/:id', singleOrder);

// Update an order by ID
router.put('/:id', updateOrder);

// Delete an order by ID
router.delete('/:id', deleteOrder);

module.exports = router;
