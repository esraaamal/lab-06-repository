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
// app.get('/weather',weatherFunc);



function locationFunc(request,response){
const city =request.query.city; //he will ask to put the city key with its value after the "?" in url
getLocation(city)
  .then(locationData=> response.status(200).json(locationData));
}


function getLocation(city){
let key =process.env.GEOCODE_API_KEY;
let url =`https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`;
return superagent.get(url)
.then(data =>{
    console.log(data);
const locationData =new Location(city ,data.body);
return locationData;

})
}

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data[0].display_name;
    this.latitude = data[0].lat;
    this.longitude = data[0].lon;
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