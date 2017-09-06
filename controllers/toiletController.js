const db = require('../models');

function index(req, res) {
  db.Toilet.find({}, function(err, allToilets) {
    if (err) {
      console.log('ERROR at index controller ', err);
    }
    res.json(allToilets)
  })
}


module.exports = {
  index: index,
}
