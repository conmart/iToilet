// require express
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

app.get('/api/allToilets', controllers.toilets.count);
app.get('/api/toilets/:skip/:ratingLimit/:scope', controllers.toilets.index);
app.post('/api/toilets', controllers.toilets.create);
app.put('/api/toilets/:id', controllers.toilets.update);

app.delete('/api/toilets/:id', controllers.toilets.destroy);

app.get('/api/reviews', controllers.reviews.index);
app.get('/api/reviews/:toiletId', controllers.reviews.which);
app.post('/api/reviews/:toiletId', controllers.reviews.create);
app.delete('/api/reviews/:reviewId', controllers.reviews.destroy);



app.listen(process.env.PORT || 3000, function () {
  console.log("Express server up and running on port 3000");
})
