`use strict`;


const express =require('express');

const server =express();

const cors = require('cors');

require('dotenv').config();



const PORT = process.env.PORT ||3000;

server.use(cors());

//http://localhost:3000/test


server.get('/test',(request,response)=>{

    response.send('youhhhhhhhhhhhhh are great Esraa');
    
    });

//to test the server

server.get('/location',(request,response)=>{

    // response.send('youhhhhhhhhhhhhh are great Esraa');
    const geo1 = require('./data/geo.json');
    const city =request.query.city;
    const loacData =new Location(city ,geo1);
    response.send(loacData);


    });


//build a constructor for location

function Location(city ,geo1){
    this.search_query = city;
    this.formatted_query = geo1[0].display_name;
    this.latitude = geo1[0].lat;
    this.longitude =geo1[0].lon;



}

























server.listen(PORT ,() =>{


    console.log('listening on port', PORT);
    
    });