const db = require('./models');

let toiletData = [];

toiletData.push({
    Address: "7 The Embarcadero, San Francisco, CA 94105",
    Lat: 37.798579,
    Long: -122.396911,
    Price: 0,
    Rating: 5,
    Public: true,
    Availabilty: "Medium",
    Amount: 1,
    Pictures: ["http://www.freeiconspng.com/uploads/bathroom-restroom-toilet-icon-20.png", "http://i.imgur.com/aExxCQv.png?1"],
})

db.Toilet.remove({}, function(err, toilets){

  db.Toilet.create(toiletData, function(err, toilets){
    if (err) { return console.log('ERROR', err); }
    console.log("all toilets:", toilets);
    console.log("created", toilets.length, "toilets");
    process.exit();
  });

});
