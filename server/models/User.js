const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, default:null},
  membership: {
    type: String,
    enum: ['General', 'Gold', 'Premium'],
    default: 'General'
  },role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',  
  },
});

module.exports = mongoose.model('User', userSchema);
