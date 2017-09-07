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
  availability: String,
  amount: Number,
  pictures: [String],
})

const Toilet = mongoose.model('Toilet', ToiletSchema);
module.exports = Toilet;
