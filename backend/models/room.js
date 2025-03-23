const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  amenities: [String],
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', roomSchema);