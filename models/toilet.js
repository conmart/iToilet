const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToiletSchema = new Schema({
  Address: String,
  Lat: Number,
  Long: Number,
  Price: Number,
  Rating: Number,
  Public: Boolean,
  Availabilty: String,
  Amount: Number,
  Pictures: [String],
  // Reviews: [ReviewSchema]
})

const Toilet = mongoose.model('Toilet', ToiletSchema);
module.exports = Toilet;
