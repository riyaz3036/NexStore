const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, default:null}],
  price: {type: Number, required: true},
  offer_price: {type: Number, required: true}
});

module.exports = mongoose.model('Variant', variantSchema);
