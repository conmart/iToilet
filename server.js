// Future reference: Clean up / get rid of unnecessary newlines & comments before submitting project

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// Adding in controllers
const controllers = require('./controllers');

//Routes
app.use(express.static('public'));

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// These 2 routes should be condensed to the route 'api/toilets'
// app.get('/api/toilets', controllers.toilets.index);
// Try to use the default URL (i.e. '/api/toilets', not '/api/allToilets') unless you have a good reason
// Look at my comments in your toilets controller for elaboration
app.post('/api/toilets', controllers.toilets.create);
app.put('/api/toilets/:id', controllers.toilets.update);
// this toiletJSON route is not being used anywhere

app.delete('/api/toilets/:id', controllers.toilets.destroy);

// This '/api/reviews' index route is not needed & never used


// More semantic to have reviews nested underneath toilets
// i.e. '/api/toilets/:toiletId/reviews'
// Per my last comment, try to use the default URL/method name when possible (i.e. controllers.reviews.index, not controllers.reviews.which)
app.get('/api/reviews/:toiletId', controllers.reviews.which);
app.post('/api/reviews/:toiletId', controllers.reviews.create);
app.delete('/api/reviews/:reviewId', controllers.reviews.destroy);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express server up and running on port 3000");
})
