require ('dotenv').config();
var keys = require ('./keys.js');
var Spotify = require ('node-spotify-api');
var Twitter = require ('twitter');
var request = require ('request');
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
            message: 'What song would you like to learn more about??(If no song is entered - the default song is "Fade to Black" by Metallica',
            name: 'song'
        }
    ])
    .then(function(response) {
        if (response.song === "") {response.song = "fade to black"};
        clientSpotify.search({ type: 'track', query: response.song}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Track: " + data.tracks.items[0].name)
            console.log("Preview URL: " + data.tracks.items[0].preview_url)
            });
    });
}

var movieThis = function() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What movie would you like to know more about? If no movie is entered, the default movie is Mr Nobody',
            name: 'movie'
        }
    ])
    .then(function(response) {
        if (response.movie === '') {response.movie = 'Mr. Nobody'};
        var url = 'http://www.omdbapi.com/?t=' + response.movie + '&apikey=b6af38b3';
        request(url, function(err,res,body) {
            let json = JSON.parse(body);
            console.log("Title: " + json.Title);
            console.log("Year: " + json.Year);
            console.log("IMDB Rating: " + json.imdbRating);
            console.log("Rotten Tomatoes Rating: "+ json.Ratings[1].Value);
            console.log("Country: " + json.Country);
            console.log("Language: " + json.Language);
            console.log("Actors: " + json.Actors);
            //console.log(json);
            });
    });
}

var doWhatItSays = function() {

}

//console.log(spotify.keys.id);
//console.log(client.keys.consumer_key);