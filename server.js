`use strict`;


// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg= require('pg');





const PORT = process.env.PORT || 3000;
const client =new pg.Client(process.env.DATABASE_URL);
const app = express();
app.use(cors());




//http://localhost:3000/test

app.get('/location',locationFunc);



function locationFunc(request,response){
    
const city =request.query.city; //he will ask to put the city key with its value after the "?" in url
getLocationFromDb(city)
  .then(locationData=> response.status(200).json(locationData));
}


let lat;
let lon;
function getLocationFromDb(city){
let SQL = 'SELECT * FROM location_city where search_query=$1;';
let safeValues =[city];
 return client.query(SQL, safeValues)
.then(results =>{
if (results.count){
  //results.count mean if there is amman return the info location for it
return results.rows[0];
}else{
    getLocation(city)
    .then (results =>{
        return results;
    });
}

    // response.status(200).json(results.rows);
})
.catch (error => errorHandler(error));
}




function getLocation(city){
let key =process.env.GEOCODE_API_KEY;
let url =`https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;




return superagent.get(url)
.then(geodata =>{
    console.log(geodata);
const locationData =new Location(city ,geodata.body);
lat=locationData.latitude;
lon=locationData.longitude;
let SQL= 'INSERT INTO location_city (search_query,formatted_query,latitude,longitude) VALUES ($1,$2,$3,$4);';
let safeValues =[city,locationData.formatted_query,lat,lon];
return client.query(SQL,safeValues)
.then(results=>{
  results.rows[0];
})
// return locationData;

})
}



function Location(city, geodata) {
    this.search_query = city;
    this.formatted_query = geodata[0].display_name;
    this.latitude = geodata[0].lat;
    this.longitude =geodata[0].lon;
  }
app.get('/weather',weatherHandler);


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






  app.get('/trails',trailsFunc);

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







// Error Handler/////////////////////////////////////////////
app.get('*', notFoundHandler);

//let's have another function to handle any errors
app.use(errorHandler);

function notFoundHandler(request,response) { 
    response.status(404).send('huh????');
}

function errorHandler(error, request, response) {
    response.status(500).send(error);
}
////////////////////////////////////////////////////////////





let errArr =[
{

    status: 500,
    responseText:"Sorry, something went wrong" 
}

];

app.use('*',(request,response) => {
    response.status(500).send(new CoverError());
});

function CoverError(){
    this.status =errArr[0].status;
    this.responseText=errArr[0].responseText ;
   
}





client.connect()
.then(()=>{
  app.listen(PORT, () => {
      console.log('listening on port', PORT);
  });
})
