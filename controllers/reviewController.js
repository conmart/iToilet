const db = require('../models');


function index (req, res) {
  db.Review.find({}, function(err, allReviews) {
    if (err) {
      console.log('ERROR at index controller ', err);
    }
    res.json(allReviews);
  })
}


function which (req, res) {
  console.log('toilet ID passed to which function', req.params.toiletId);
  db.Review.find({toilet: req.params.toiletId}, function(err, matchReviews) {
    if (err) {
      console.log('ERROR at which controller ', err);
    }
    console.log("matched reviews", matchReviews);
    res.json(matchReviews);
  })
}





module.exports = {
  index: index,
  which: which,
}
