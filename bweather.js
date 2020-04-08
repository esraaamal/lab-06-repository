'use strict';

// app.get('/weather',weatherHandler);
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
app.use(cors());

function weatherHandler(request,response){
const cityWeath =request.query.city;

getWeather(cityWeath)
.then (weatherData =>response.status(200).json(weatherData));

}
  


function getWeather(cityWeath){
const key = process.env.WEATHER_API_KEY;
const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityWeath}&key=${key}`;
console.log('ddddddddddddddddddddddddddddd',url);
return superagent.get(url)
.then(weatherData =>{
let newData =weatherData.body.data;

 let newWeather= newData.map(weatherData =>{
return new Weather(weatherData);
// arrWeather.push(weatherData);

});
return newWeather;

})

}

function Weather(day) {
    this.forecast = day.weather.description;
      this.time = new Date(day.valid_date).toString().slice(0,15);
  }



  module.exports = weatherHandler;
