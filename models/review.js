const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: Number,
  description: String,
  date: Date,
)}

  const Toilet = mongoose.model('Toilet', ToiletSchema);
  module.exports = Toilet;
