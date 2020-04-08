'use strict';

// app.get('/movies',movieFunc);
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const app = express();
app.use(cors());


function movieFunc(request,response){
    const city =request.query.city; 
    getMovie(city)
      .then(movieOnData => response.status(200).json(movieOnData));
    }



function getMovie(city){
    let key =process.env.MOVIE_API_KEY;
    let url =`https://api.themoviedb.org/3/movie/550?api_key=${key}`;
    return superagent.get(url)
    .then(moviedata =>{
        console.log(moviedata);
    const movieOnData =new Movies(moviedata.body);
    return movieOnData;
    
    })
    }


    function Movies(moviedata) {
        this.title = moviedata.title;
        this.overview = moviedata.overview;
        this.average_votes= moviedata.vote_average;
        this.total_votes=moviedata.vote_count;
        this.image_url=moviedata.backdrop_path;
        this.popularity=moviedata.popularity;
        this.released_on=moviedata.release_date;

      }
      module.exports = movieFunc;
