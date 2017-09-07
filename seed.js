const db = require('./models');

let toiletData = [];

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



let reviewList = [
  {
    rating: 5,
    description: "Best toilet ever!",
  },
  {
    rating: 3,
    description: "It was okay I guess.",
  }
]

db.Toilet.remove({}, function(err, toilets){

  db.Toilet.create(toiletData, function(err, toilets){
    if (err) { return console.log('ERROR', err); }
    console.log("all toilets:", toilets);
    console.log("created", toilets.length, "toilets");
    process.exit();
  });

});

db.Review.remove({}, function(err, toilets){

  db.Review.create(reviewList, function(err, reviews){
    if (err) { return console.log('ERROR', err); }
    console.log("all reviews:", reviews);
    console.log("created", reviews.length, "reviews");
    process.exit();
  });

});
