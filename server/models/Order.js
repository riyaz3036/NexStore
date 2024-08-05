const mongoose = require('mongoose');

const variantItemSchema = new mongoose.Schema({
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant', required: true },
  quantity: { type: Number, required: true }
}, { _id: false }); 

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  variants: [variantItemSchema],
  payment_mode: { type: String, required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);
