const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true  },
  best_seller: {type: Boolean, default: false}
});

module.exports = mongoose.model('Product', productSchema);
