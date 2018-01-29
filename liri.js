require ('dotenv').config();
var keys = require ('./keys.js');
var Spotify = require ('spotify');
var Twitter = require ('twitter');
var omdb = require ('omdb');
var inquirer = require ('inquirer');

var Spotify = function(keys) {
    this.keys = keys;
}


var clientSpotify = new Spotify(keys.spotify);
var clientTwitter = new Twitter(keys.twitter);

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['My last 20 tweets', 'spotify this song', 'movie this', 'do what it says'],
        name: "action"
    }
])
.then(function(response) {
    if (response.action === 'My last 20 tweets') {
        getTweets();  
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

var getTweets = function() {
    clientTwitter.get('search/tweets', {q: 'JaimeBootCamp', count: 20, result_type: 'recent'}, function(error, tweets, response) {
    for (var i = 0; i < 20; i++){
    console.log(" Created At: " + tweets.statuses[i].created_at + "tweet: " + tweets.statuses[i].text);
    console.log("--------------------------------------------------------------------");
    }
    });
}

var spotifyThis = function() {

}

var movieThis = function() {

}

var doWhatItSays = function() {

}

//console.log(spotify.keys.id);
//console.log(client.keys.consumer_key);