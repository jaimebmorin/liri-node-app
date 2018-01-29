require ('dotenv').config();
var keys = require ('./keys.js');
var Spotify = require ('spotify');
var Twitter = require ('twitter');
var omdb = require ('omdb');
var inquirer = require ('inquirer');

var Spotify = function(keys) {
    this.keys = keys;
}

//var Twitter = function(keys) {
//    this.keys = keys;
//    this.getTweets = function() {
//        console.log(this.keys);
//            this.get('favorites/list', function(error, tweets, response) {
//            if(error) throw error;
//            console.log(tweets);  // The favorites. 
//            console.log(response);  // Raw response object. 
//          });
//    }
//}

var clientSpotify = new Spotify(keys.spotify);
var clientTwitter = new Twitter(keys.twitter);

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['my tweets', 'spotify this song', 'movie this', 'do what it says'],
        name: "action"
    }
])
.then(function(response) {
    if (response.action === 'my tweets') {
        clientTwitter.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
        console.log(tweets);
         });
    } else if (response.action === 'spotify this song') {
        spotifyThis();
        console.log("You would like to spotify a song");
    } else if (response.action === 'movie this') {
        console.log("you would like to movie this");
        movieThis();
    } else {
        console.log("you would like do what it says");
        doWhatItSays();
    }
});

var spotifyThis = function() {

}

var movieThis = function() {

}

var doWhatItSays = function() {

}

//console.log(spotify.keys.id);
//console.log(client.keys.consumer_key);