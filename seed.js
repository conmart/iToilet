const db = require('./models');

let toiletData = [];

// reviewsData empty – ever used? Do you manually uncomment this to seed? Should not have to do that.

// Just define the toiletData array with these objects included – no need to push a dozen objects when you're creating an empty array from scratch.


db.Toilet.remove({}, function(err, toilets){
  console.log('removed all toilets');
  db.Toilet.create(toiletData, function(err, toilets){
    if (err) { return console.log('ERROR', err); }
    console.log("created", toilets.length, "toilets");
    db.Review.remove({}, function(err, reviews){
      console.log('removed all reviews');
      reviewList.forEach( function(review) {
        let newReview = new db.Review({
          rating: review.rating,
          description: review.description,
          toiletName: review.toiletName,
        });
        db.Toilet.findOne({name: review.toiletName}, function(err, foundToilet){
          if (err) {
            console.log('could not find toilet', err);
          }
          newReview.toilet = foundToilet;
          newReview.save(function(err, savedReview){
            if (err) {
              return console.log('SAVED REVIEW ERR',err);
            }
            // console.log('THIS IS THE SAVED review', savedReview);
            // console.log('THIS IS THE TOILET', foundToilet);
          });
        });
      });
    });
  });
});
