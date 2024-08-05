const mongoose = require('mongoose');

const variantItemSchema = new mongoose.Schema({
  variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant', required: true },
  quantity: { type: Number, required: true }
}, { _id: false }); 

const cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  variants: [variantItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
