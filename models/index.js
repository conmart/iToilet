const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/iToilet", {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports.Toilet = require('./toilet');
module.exports.Review = require('./review');
