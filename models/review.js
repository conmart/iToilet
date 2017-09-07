const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: Number,
  description: String,
  date: {type: Date, default: Date.now},
  toiletName: String,
  toilet: {
    type: Schema.Types.ObjectId,
    ref: 'Toilet'
  }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
