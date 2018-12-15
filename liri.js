// Imported npm packages 
require("dotenv").config();
const keys = require("./keys.js");
const moment = require("moment");
// const fs = require("fs");
const axios = require("axios");
// const inquirer = require("inquirer");
// const request = require("request");

// Spotify ID & Secret in the .env file and keys.js file
const spot = require("node-spotify-api");
let spotify = new spot(keys.spotify);

// Variables for user input in command line
let argument = process.argv[2];
let inputData = process.argv.slice(3).join(" ");

// Switch statement grabs argument from cmd line
// --triggers function for the argument
switch (argument) {
  case "concert-this":
    concertSearch(inputData);
    break;
  case "spotify-this-song":
    songSearch(inputData);
    break;
  case "movie-this":
    movieSearch(inputData);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log(`-+-+-+-+-+-+-+-+-\n please enter "concert-this", "spotify-this-song", or "do-what-it-says", followed by your request\n-+-+-+-+-+-+-+-+-`);
}

// Function to take user input of artist/band & output upcoming events

function concertSearch(inputData) {
  if(!inputData) {
  inputData = "Super Furry Animals";
  }
  axios.get(`https://rest.bandsintown.com/artists/${inputData}/events?app_id=codingbootcamp`)
  .then(function(response) {
    // console.log(response.data)
    for (var i=0; i<response.data.length; i++) {
      console.log(`Venue: ${response.data[i].venue.name}`);
      console.log(`City: ${response.data[i].venue.city}`);
      console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
      console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-");
    }
  })
  .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

// Function to take user input of movie name & output movie info

function movieSearch(inputData) {
  if (!inputData) {
      inputData = 'Mr. Nobody';
  }
  axios.get(`http://www.omdbapi.com/?t="${inputData}"&y=&plot=short&apikey=trilogy`).then(function (jsonData) {


      var jsonData = jsonData.data;
      console.log(`Title: ${jsonData.Title}`);
      console.log(`Year: ${jsonData.Year}`);
      console.log(`IMDB Rating: ${jsonData.imdbRating}`);
      console.log(`Rotten Tomatoes Rating: ${jsonData.tomatoRating}`);
      console.log(`Country: ${jsonData.Country}`);
      console.log(`Language: ${jsonData.Language}`);
      console.log(`Plot: ${jsonData.Plot}`);
      console.log(`Actors: ${jsonData.Actors}`);

  });
};

// Function to take spotify input and output

