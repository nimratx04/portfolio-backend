const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  testimonial: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reference', ReferenceSchema);