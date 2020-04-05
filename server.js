`use strict`;


const express =require('express');

const server =express();




const PORT = process.env.PORT ||3000;

//http://localhost:3000/test

server.use(express.static('./data/geo.json'));

server.get('/test',(request,response)=>{

    response.send('youhhhhhhhhhhhhh are great Esraa');
    
    });

//to test the server

server.listen(PORT ,() =>{


    console.log('listening on port', PORT);
    
    });