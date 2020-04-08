'use strict';

// app.get('/location',locationFunc);
//  let newhelpLocation ={};
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
app.use(cors());

function locationFunc(request,response){
const city =request.query.city; //he will ask to put the city key with its value after the "?" in url
getLocation(city)
  .then(locationData=> response.status(200).json(locationData));
}


function getLocation(city){
let key =process.env.GEOCODE_API_KEY;
let url =`https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
return superagent.get(url)
.then(geodata =>{
    console.log(geodata);
const locationData =new Location(city ,geodata.body);
return locationData;

})
}



function Location(city, geodata) {
    this.search_query = city;
    this.formatted_query = geodata[0].display_name;
    this.latitude = geodata[0].lat;
    this.longitude =geodata[0].lon;
  }



  module.exports = locationFunc;
 