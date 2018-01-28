require ('dotenv').config();
var keys = require ('./keys.js');
var spotify = require ('spotify');
var twitter = require ('twitter');

var Spotify = function(keys) {
    this.keys = keys;
}

var Twitter = function(keys) {
    this.keys = keys;
}

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//console.log(spotify.keys.id);
//console.log(client.keys.consumer_key);