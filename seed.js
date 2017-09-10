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
    lat: 37.798602,
    long: -122.396892,
    price: 0,
    rating: 5,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});

toiletData.push({
    name: "Twin Peaks",
    address: "New York City",
    lat: 37.752113,
    long: -122.447575,
    price: 0,
    rating: 4,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});

toiletData.push({
    name: "Drumm & Clay",
    address: "Drumm & Clay Sts San Francisco CA",
    lat: 37.795483,
    long: -122.396835,
    price: 0,
    rating: 2,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});

toiletData.push({
    name: "UN Plaza",
    address: "Market & 7th Sts San Francisco CA",
    lat: 37.780478,
    long: -122.412551,
    price: 0,
    rating: 1,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});

toiletData.push({
    name: "Fisherman's Wharf",
    address: "Jefferson & Powell St, San francisco CA",
    lat: 37.808597,
    long: -122.412536,
    price: 0,
    rating: 4,
    public: true,
    availability: "Medium",
    amount: 2,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});

toiletData.push({
    name: "Bay and Taylor",
    address: "Bay & Taylor St, San francisco CA",
    lat: 37.805434,
    long: -122.415266,
    price: 0,
    rating: 5,
    public: true,
    availability: "High",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});

toiletData.push({
    name: "Coit Tower",
    address: "North Beach, San Francisco, CA",
    lat: 37.802395,
    long: -122.405822,
    price: 0,
    rating: 1,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});

toiletData.push({
    name: "Washington Square",
    address: "Union St. & Columbus Ave, San Francisco, CA",
    lat: 37.800333,
    long: -122.410187,
    price: 0,
    rating: 3,
    public: true,
    availability: "Low",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});

toiletData.push({
    name: "Civic Center",
    address: "Grove & Larkin Sts San Francisco CA",
    lat: 37.778676,
    long: -122.416603,
    price: 0,
    rating: 2,
    public: true,
    availability: "Low",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});

toiletData.push({
    name: "Market & California",
    address: "Market & California San francisco CA",
    lat: 37.793583,
    long: -122.396194,
    price: 0,
    rating: 1,
    public: true,
    availability: "Low",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});

toiletData.push({
    name: "St. Mary's Square",
    address: "Pine & Quincy Sts San Francisco CA",
    lat: 37.791553,
    long: -122.405450,
    price: 0,
    rating: 4,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});
toiletData.push({
    name: "Union Square",
    address: "Geary & Powell Sts San Francisco CA",
    lat: 37.787382,
    long: -122.408241,
    price: 0,
    rating: 4,
    public: true,
    availability: "Low",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});
toiletData.push({
    name: "MacCauley Park",
    address: "Larkin & O'Farrell Sts San Francisco CA",
    lat: 37.785184,
    long: -122.417931,
    price: 0,
    rating: 5,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});
toiletData.push({
    name: "Boedecker Park",
    address: "Eddy & Jones Sts San Francisco CA",
    lat: 37.783939,
    long: -122.412622,
    price: 0,
    rating: 3,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png"],
});
toiletData.push({
    name: "New York",
    address: "New York City",
    lat: 45.798579,
    long: 74.0059,
    price: 0,
    rating: 1,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});

toiletData.push({
    name: "Seattle",
    address: "New York City",
    lat: 55.798579,
    long: -122.396911,
    price: 0,
    rating: 1,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});

toiletData.push({
    name: "Los Angeles",
    address: "New York City",
    lat: 35.798579,
    long: -122.396911,
    price: 0,
    rating: 1,
    public: true,
    availability: "Medium",
    amount: 1,
    pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
});




db.Toilet.remove({}, function(err, toilets){
  console.log('removed all toilets');
  db.Toilet.create(toiletData, function(err, toilets){
    if (err) { return console.log('ERROR', err); }
    // console.log("all toilets:", toilets);
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
