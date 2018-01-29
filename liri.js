require ('dotenv').config();
var keys = require ('./keys.js');
var Spotify = require ('node-spotify-api');
var Twitter = require ('twitter');
var omdb = require ('omdb');
var inquirer = require ('inquirer');

var clientSpotify = new Spotify(keys.spotify);
var clientTwitter = new Twitter(keys.twitter);

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['My last 20 tweets', 'spotify this', 'movie this', 'do what it says'],
        name: "action"
    }
])
.then(function(response) {
    if (response.action === 'My last 20 tweets') {
        getTweets();  
    } else if (response.action === 'spotify this') {
        spotifyThis();
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
    inquirer.prompt([
        {
            type: 'input',
            message: 'What song would you like to learn more about??(If no song is entered - the default song is "The sign" by Ace of base',
            name: 'song'
        }
    ])
    .then(function(response) {
        clientSpotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }          
        console.log(data);
        });
    });
}

var movieThis = function() {

}

var doWhatItSays = function() {

}

//console.log(spotify.keys.id);
//console.log(client.keys.consumer_key);