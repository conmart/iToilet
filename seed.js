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


db.Toilet.remove({}, function(err, toilets){

  db.Toilet.create(toiletData, function(err, toilets){
    if (err) { return console.log('ERROR', err); }
    console.log("all toilets:", toilets);
    console.log("created", toilets.length, "toilets");
    process.exit();
  });

});
