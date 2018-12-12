// Imported npm packages 
require("dotenv").config();
const keys = require("./keys.js");
const moment = require("moment");
const fs = require("fs");
const axios = require("axios");

// Spotify ID & Secret in the .env file and keys.js file
const sp = require("node-spotify-api");
let spotify = new sp(keys.spotify);

// Variables for user input in command line
let argument = process.argv[2];
let input = process.argv[3];

