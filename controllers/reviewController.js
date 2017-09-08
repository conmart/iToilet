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
  // console.log('toilet ID passed to which function', req.params.toiletId);
  db.Review.find({toilet: req.params.toiletId}, function(err, matchReviews) {
    if (err) {
      console.log('ERROR at which controller ', err);
    }
    // console.log("matched reviews", matchReviews);
    res.json(matchReviews);
  })
}

function create (req, res) {
  // console.log('create review body', req.body);
  // console.log('Id that will be searched', req.params.toiletId);
  db.Toilet.findById(req.params.toiletId, function (err, foundToilet) {
    if (err) {
      console.log(err);
    }
    db.Review.create({
      rating: req.body.rating,
      description: req.body.description,
      toilet: foundToilet,
    });
    res.json(foundToilet);
  });
}


function destroy (req, res) {
  db.Review.findByIdAndRemove({_id: req.params.reviewId}, function(err, deletedReview) {
    res.sendStatus(200);
  });
}


module.exports = {
  index: index,
  which: which,
  create: create,
  destroy: destroy
}
