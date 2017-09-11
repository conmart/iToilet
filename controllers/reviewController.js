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
  let sumToiletRating = 0;
  let toiletLength = 0;

  db.Toilet.findById(req.params.toiletId, function (err, foundToilet) {
      if (err) {
          console.log(err);
      }
    db.Review.create({
      rating: req.body.rating,
      description: req.body.description,
      toilet: foundToilet,
    }, function(createdReview) {
        db.Review.find({toilet: req.params.toiletId}, (err, foundToiletAgain) => {
            if (err) {
                console.log(err);
            }
            foundToiletAgain.forEach(function(eachToilet) {
                toiletLength += 1;
                sumToiletRating += eachToilet.rating
                console.log('each toilet rating is ', eachToilet.rating)
            })
            db.Toilet.findByIdAndUpdate(req.params.toiletId, {new:true}, (err, foundToiletRating) => {
                console.log(sumToiletRating);
                // console.log(toiletLength);
                foundToiletRating.rating = Math.round(sumToiletRating/toiletLength);
                foundToiletRating.save();
                res.json(foundToiletRating);
            })
        })
    });
    // res.json(foundToilet);
  });

  }


function destroy (req, res) {
    let sumRatings = 0;
    let ratingLength = 0;
  db.Review.findByIdAndRemove({_id: req.params.reviewId}, function(err, deletedReview) {
      db.Review.find({toilet: deletedReview.toilet}, function(err, foundReviews) {
          foundReviews.forEach(function(each) {
            sumRatings += each.rating;
            ratingLength += 1;
          })
      db.Toilet.findById(deletedReview.toilet, function(err, foundToilet) {
          console.log(Math.round(sumRatings/ratingLength));
          foundToilet.rating = sumRatings/ratingLength;
          foundToilet.save();
      })
      })
    res.sendStatus(200);
  });
}


module.exports = {
  index: index,
  which: which,
  create: create,
  destroy: destroy
}
