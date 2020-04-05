`use strict`;


const express = require('express');

const server = express();

const cors = require('cors');

require('dotenv').config();



const PORT = process.env.PORT || 3000;

server.use(cors());

//http://localhost:3000/test


server.get('/test', (request, response) => {

    response.send('youhhhhhhhhhhhhh are great Esraa');

});

//to test the server

server.get('/location', (request, response) => {

    // response.send('youhhhhhhhhhhhhh are great Esraa');
    const geo1 = require('./data/geo.json');
    const city = request.query.city;
    const loacData = new Location(city, geo1);
    response.send(loacData);


});


//build a constructor for location

function Location(city, geo1) {
    this.search_query = city;
    this.formatted_query = geo1[0].display_name;
    this.latitude = geo1[0].lat;
    this.longitude = geo1[0].lon;

}



server.get('/weather', (request, response) => {
let pushArr =[];
    const weatherObj = require('./data/weather.json');
    const city1 = request.query.city;
    for (let s=0;s<weatherObj.data.length;s++){
       pushArr.push(new Weather(weatherObj,s));
      }
    response.send(pushArr);


});

function Weather(weatherObj ,s) {
    this.forecast = weatherObj.data[s].weather.description;
    this.time = weatherObj.data[s].valid_date;

}




// server.use((error, req, res) => {
//     res.status(500).send(error);
// })


// server.use('*', (req, res) => {
//     res.status(404).send('NOT FOUND');
// });

let errArr =[
{

    status: 500,
    responseText:"Sorry, something went wrong" 
}

];

server.use('*',(request,response) => {
    response.status(500).send(new CoverError());
});

function CoverError(){
    this.status =errArr[0].status;
    this.responseText=errArr[0].responseText ;
    // this.error= error;
    // status: 500,
    // responseText: "Sorry, something went wrong",

}







server.listen(PORT, () => {


    console.log('listening on port', PORT);

});