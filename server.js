`use strict`;

const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

const myLocation = require('./alocation.js');
const myWeather = require('./bweather.js');
const myTrails = require('./ctrails.js');
const myMovies = require('./dmovies.js');
const myyelp = require('./eyelp.js');


app.get('/location', myLocation);
app.get('/weather', myWeather);
app.get('/trails', myTrails);
app.get('/movies', myMovies);
app.get('/yelp', myyelp);

//ERROR///////////////////////
let errArr = [
 {
status: 500,
responseText: "Sorry, something went wrong"
 }
];
app.use('*', (request, response) => {
response.status(500).send(new CoverError());
});

function CoverError() {
    this.status = errArr[0].status;
    this.responseText = errArr[0].responseText;
}
app.listen(PORT, () => {
console.log('listening on port', PORT);
});