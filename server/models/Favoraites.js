const mongoose = require('mongoose');

const favoraitesSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }]
});

module.exports = mongoose.model('Favoraites', favoraitesSchema);

