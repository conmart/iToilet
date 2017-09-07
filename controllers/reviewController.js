const db = require('../models');


function index (req, res) {
  db.Review.find({}, function(err, allReviews) {
    if (err) {
      console.log('ERROR at index controller ', err);
    }
    res.json(allReviews);
  })
}





module.exports = {
  index: index,
}
