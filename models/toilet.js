const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToiletSchema = new Schema({
  name: String,
  address: String,
  lat: Number,
  long: Number,
  price: Number,
  rating: Number,
  public: Boolean,
  availabilty: String,
  amount: Number,
  pictures: [String],
  // Reviews: [ReviewSchema]
})

const Toilet = mongoose.model('Toilet', ToiletSchema);
module.exports = Toilet;
