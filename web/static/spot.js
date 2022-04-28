const axios = require('axios')

const _clientId = 'a7b734f818404ff08d6b4f34b7ad3c33'; // Your client id
const _clientSecret = '56bbf4411c364f1498a9be9c22e92693'; // Your secret
var _redirectUri = 'http://localhost:8000'; // Your redirect uri
var _token = "BQDwsIvd29fPC9-l8kFvwNvEAZ7WsbO3OyGtb0PAAl8CGet2Yd5pl-M9yFgRpjFr0RdyRieXrKcyKlZDg9PvKrX1OZMc9kTtQ2CrY3g5Y_ZgNSyoL4ioqlv4xiAP3Ohdm68lcG9HkhZIvAU7Am3RkRpnGFJkoUzhFitAXq_YArXx5QVR0LucMVY";

const fs = require('fs')
const scopes=["streaming user-modify-playback-state", "user-library-modify", "user-read-currently-playing", "user-library-read", "user-read-recently-played"];

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: _clientId,
  clientSecret: _clientSecret,
  redirectUri: _redirectUri
});

spotifyApi.setAccessToken(_token);


/*
spotifyApi.getPlaylist('4GvUZTQaQmeIrukMebTAyt')
  .then(function(data) {
    console.log('Some information about this playlist', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
});


spotifyApi.getMyDevices()
  .then(function(data) {
    let availableDevices = data.body.devices;
    console.log(availableDevices);
  }, function(err) {
    console.log('Something went wrong!', err);
});
*/


spotifyApi.getMyCurrentPlaybackState()
  .then(function(data) {
    // Output items
    if (data.body && data.body.is_playing) {
      console.log("User is currently playing something!");
    } else {
      console.log("User is not playing anything, or doing so in private.");
    }
  }, function(err) {
    console.log('Something went wrong!', err);
});
