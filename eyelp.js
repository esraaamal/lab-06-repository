'use strict';

// app.get('/yelp',yelpFunc);
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
app.use(cors());

function yelpFunc(request,response){
    const city =request.query.city; 
    getYelp(city)
      .then(yelpOnData => response.status(200).json(yelpOnData));
    }
//hi

    function getYelp(city){
       
        let key =process.env.YELP_API_KEY;
        let url =`https://api.yelp.com/v3/businesses/search?location=${city}`;
        return superagent.get(url)
        .set('Authorization',`Bearer ${key}`)
        .then(yData =>{
            console.log(yData);
        const yelpOnData =new Yelp(yData.body);
        return yelpOnData;
        
        })
        }


        function Yelp(yData) {
            this.name=yData.businesses[0].name;
            this.image_url= yData.businesses[0].image_url;
            this.price= yData.businesses[0].price;
            this.rating=yData.businesses[0].rating;
            this.url=yData.businesses[0].url;
    
          }

          module.exports = yelpFunc;
