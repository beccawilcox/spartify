const axios = require('axios')

const _clientId = 'a7b734f818404ff08d6b4f34b7ad3c33'; // Your client id
const _clientSecret = '56bbf4411c364f1498a9be9c22e92693'; // Your secret
var _redirectUri = 'http://localhost:8000'; // Your redirect uri
var _token = "BQAUdFsIN9HYfa5Q-ShDfpotDWbHzVnIqTem1FOBj1FlozFCWvF1wAQeuSXm6KVUvKFbfhLSCJzpL07PhDwGJ8u0DXl3spSfF6QJn4p1C5ldm1jMrTDbfNncqBKOYunGHkBhkc6fVW_nnX6JFFh2Nl6FyVaS-5rmgU88-qutx43lyho";



var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: _clientId,
  clientSecret: _clientSecret,
  redirectUri: _redirectUri
});

spotifyApi.setAccessToken(_token);

window.onSpotifyWebPlaybackSDKReady = () => {
  // You can now initialize Spotify.Player and use the SDK
};

play({
  playerInstance: new Spotify.Player({ name: "..." }),
  spotify_uri: 'spotify:playlist:05coRtVcVSSmFqSqyH3CTx',
});

function play(contextUri){
  spotifyApi.play({context_uri:contextUri, device_id:'8a5a39ffb7989e45696876053074a2bf795277e6'})
    .then(function() {
      console.log('Playback started');
    }, function(err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log('Something went wrong!', err);
  });
}
//pause();
play("05coRtVcVSSmFqSqyH3CTx");






spotifyApi.getMyDevices()
  .then(function(data) {
    let availableDevices = data.body.devices;
    console.log(availableDevices);
  }, function(err) {
    console.log('Something went wrong!', err);
});

function isplaying(){
  spotifyApi.getMyCurrentPlaybackState()
    .then(function(data) {
      // Output items
      if (data.body && data.body.is_playing) {
       return true;
      } else {
      return false;
    }
  }, function(err) {
    console.log('Something went wrong!', err);
});
}

console.log(isplaying());
/*
function play(){
  if(isplaying()) {
     spotifyApi.play(thing)
      .then(function() {
        console.log('Playback started');
      }, function(err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
  });
}
*/

//var currentSong = async () =>{ await spotifyApi.getMyCurrentPlayingTrack().then(function(data){data.body.item.name});



function pause(){
  spotifyApi.pause()
    .then(function() {
      console.log('Playback paused');
    }, function(err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log('Something went wrong!', err);
  });
}
