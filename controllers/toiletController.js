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

function update(req,res) {
  db.Toilet.findByIdAndUpdate(req.body.id, {new:true}, (err, toilet) => {
    toilet.name = req.body.name;
    toilet.address = req.body.address;
    toilet.price = req.body.price;
        // toilet.rating = req.body.rating,
    toilet.amount = req.body.amount;
    toilet.save();
  })
}


module.exports = {
  index: index,
  create: create,
  update: update,
}
