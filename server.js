`use strict`;


// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');




const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.use(cors());

//http://localhost:3000/test

app.get('/location',locationFunc);



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
//   app.get('/weather',weatherHandler);


// function weatherHandler(request,response){
// const city =request.query.city;

// getWeather(city)
// .then (weatherData =>response.status(200).json(weatherData));

// }
  

// const arrWeather=[];

// function getWeather(city){
// let key=process.env.WEATHER_API_KEY;
// const url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;
// console.log('ddddddddddddddddddddddddddddd',url);
// return superagent.get(url)
// .then(weatherData =>{
// let newData =weatherData.body.data;

//  return newData.map(weatherData =>{
// return new Weather(weatherData);
// // arrWeather.push(weatherData);

// });
// // return arrWeather;

// })

// }
// console.log(arrWeather);

// function Weather(day) {
//     this.forecast = day.weather.description;
//       // this.time = new Date(day.valid_date).toString().slice(0,15);
//       this.time = day.valid_date;
//   }

server.get('/weather',responseWeather);

function responseWeather(req,res){
  const weatherCity = req.query.city;
  dataWeather(weatherCity)
    .then(val => res.status(200).json(val));
}

function dataWeather(weatherCity) {
  const key = process.env.WEATHER_KEY_API;
  const dataWeather = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherCity}&key=${key}`;
  return superagent.get(dataWeather)
    .then(val =>{
      const dataArray = val.body.data;
      let array = dataArray.map(val => {
        const weather = new Weather(val);
        return weather;});
      return array;
    })
}

function Weather(dataWeath){
  this.forecast = dataWeath.weather.description;
  this.time = dataWeath.valid_date;
}




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







app.listen(PORT, () => {


    console.log('listening on port', PORT);

});