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


app.get('/api/toilets', controllers.toilets.index);
app.post('/api/toilets', controllers.toilets.create);





app.listen(process.env.PORT || 3000, function () {
  console.log("Express server up and running on port 3000");
})
