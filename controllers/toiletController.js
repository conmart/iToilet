const db = require('../models');

function index(req, res) {
  db.Toilet.find({}, function(err, allToilets) {
    if (err) {
      console.log('ERROR at index controller ', err);
    }
    res.json(allToilets)
  })
}

function create(req, res) {
  console.log(req.body);
  db.Toilet.create({
      name: req.body.name,
      address: req.body.address,
      price: req.body.price,
      rating: req.body.rating,
      public: req.body.public,
      availability: req.body.availability,
      amount: req.body.amount,
      pictures: req.body.pictures,
  }, function(err, createdToilet) {
      if (err) {
        console.log("error is ", err)
      }
      res.json(createdToilet);
  })
}


module.exports = {
  index: index,
  create: create
}
