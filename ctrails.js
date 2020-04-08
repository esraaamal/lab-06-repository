'use strict';

// app.get('/trails',trailsFunc);
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
app.use(cors());


function trailsFunc(request ,response){
const cityTrailes = request.query.city;
const latit =request.query.lat;
const longit =request.query.long;


getTrailes(cityTrailes,latit,longit)
.then(trailesData =>response.status(200).json(trailesData));


}


function getTrailes(cityTrailes,latit,longit){

const key = process.env.TRAIL_API_KEY;
const url =`https://www.hikingproject.com/data/get-trails?lat=${latit}&lon=${longit}&maxDistance=150&maxResults=10&key=${key}`;
return superagent.get(url)
.then(trailesData =>{

  let newData =trailesData.body.trails;

  let newTrailes= newData.map(trailesData=>{
 return new Trailes(trailesData);
 // arrWeather.push(weatherData);
 
 });
 return newTrailes;

});
}




function Trailes(data1){
  this.name =data1.name ;
  this.location=data1.location;
  this.length=data1.length;
  this.stars=data1.stars;
  this.star_votes=data1.starVotes;
  this.summary=data1.summary;
  this.trail_url=data1.url;
  this.conditions=data1.conditionStatus;
  let date1=data1.conditionDate.split(" ");
  this.condition_date=date1[0];
  this.condition_time =date1[1];

};


module.exports = trailsFunc;
