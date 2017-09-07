const db = require('./models');

let toiletData = [];

let reviewList = [
  {
    rating: 5,
    description: "Best toilet ever!",
    toiletName: "Pier 8",
  },
  {
    rating: 3,
    description: "It was okay I guess.",
    toiletName: "Pier 7",
  },
  {
    rating: 4,
    description: "decent toilet.",
    toiletName: "Pier 7",
  }
];




toiletData.push({
    name: "Pier 7",
    address: "7 The Embarcadero, San Francisco, CA 94105",
    lat: 37.798579,
    long: -122.396911,
    price: 0,
    rating: 5,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});

toiletData.push({
    name: "Pier 8",
    address: "8 The Embarcadero, San Francisco, CA 94105",
    lat: 37.798579,
    long: -122.396911,
    price: 0,
    rating: 1,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
})





db.Toilet.remove({}, function(err, toilets){
  console.log('removed all toilets');
  db.Toilet.create(toiletData, function(err, toilets){
    if (err) { return console.log('ERROR', err); }
    console.log("all toilets:", toilets);
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
            console.log('THIS IS THE SAVED REVIEW', savedReview);
            console.log('THIS IS THE TOILET', foundToilet);
          });
        });
      });
    });
  });
});

// db.Review.remove({}, function(err, reveiws){
//
//   db.Review.create(reviewList, function(err, reviews){
//     if (err) { return console.log('ERROR', err); }
//     console.log("all reviews:", reviews);
//     console.log("created", reviews.length, "reviews");
//   });
//
// });
