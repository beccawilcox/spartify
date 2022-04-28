var SpotifyWebApi = require('spotify-web-api-node');
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const path = require('path');
let ejs = require('ejs');
const clientId = 'a7b734f818404ff08d6b4f34b7ad3c33'; // Your client id
const clientSecret = '56bbf4411c364f1498a9be9c22e92693'; // Your secret
var redirect_uri = 'http://localhost:8000/dashboard'; // Your redirect uri
var accessToken = "BQD5xGmgZoLvyBe-O3xfsvuYS-CTXYse053_MnY7yPYu9Aw3WpGLxpBMNBzO4naINw_hQZEthGCac2XBA5Yhk-mR95oi1FsrzbcAt7INqPg_9xQMWmdQX7V5nA-c60T0aqk4WLjlpkDZWYKvHtGBXcayxs4ERkDKHE2edDYg6sU";
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirect_uri
});
spotifyApi.setAccessToken(accessToken);
var red_angry="6cnOv1rbqq2HcGFAxDBXjG";
var red_sad="1bkGXM7tyigxRB5FSFZu4P";
var red_happy="1ahbVVNMQyXLBZKJzmYWyX";
var orange_angry="5Dyco6qrEBBVx22cpfJ8sJ ";
var orange_sad="4GvUZTQaQmeIrukMebTAyt ";
var orange_happy="05coRtVcVSSmFqSqyH3CTx";
var yellow_angry="1YU48w8UD9bpUwjJ6gXfXn";
var yellow_sad="6CdEOh1jpwSu9lWAW0aO0L";
var yellow_happy="4C9S97Bt886HWURi3DxoGa";
var green_angry="6xqlE2TVcOh0YUmJSNH0uX";
var green_sad="425EauXafoqoVOrFUndqDK";
var green_happy="2Z4FAzKpT1ZSOYHxbVdONQ";
var blue_angry="06MoRxkYP1BhwHPqp4427T";
var blue_sad="0Okyg5E8XrpCvXP2CgibEL";
var blue_happy="76yQ6q3T1kh9TqteHDzrCB";
var purple_angry="0hvXDAChjeN8inZFPBMVh1";
var purple_sad="7BCUFDUbaqsnKdtgFkt79B";
var purple_happy="0hvXDAChjeN8inZFPBMVh1";

var paused=true;
var song="";
var color="";
var mood="";

function play(){
  spotifyApi.play()
    .then(function() {
      console.log('Playback started');
    }, function(err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log('Something went wrong!', err);
  });
}

function pause(){
  spotifyApi.pause()
    .then(function() {
      console.log('Playback paused');
    }, function(err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log('Something went wrong!', err);
  });
}


const app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];

//app.use(express.static(__dirname + '/public'))
  // .use(cors())
   //.use(cookieParser());
//app.use('/dashboard', express.static(path.join(__dirname, 'public/dashboard.html', { song: song, paused:paused })))
app.use('/img',express.static(__dirname + 'public/image/album'));
app.use('/dashboard', (req, res, next) => {
  res.render('public/dashboard.html', { song: song, paused:paused, token:accessToken  });
});

app.use('/', (req, res, next) => {
  res.render('public/index.html', {});
});

app.post('/changepurple', function(req, res) {
  color = "purple";
  console.log(color);
});

app.post('/changered', function(req, res) {
  color = "red";
  console.log(color);
});

app.post('/changeorange', function(req, res) {
  color = "orange";
  console.log(color);
});

app.post('/changeyellow', function(req, res) {
  color = "yellow";
  console.log(color);
});

app.post('/changegreen', function(req, res) {
  color = "green";
  console.log(color);
});

app.post('/changeblue', function(req, res) {
  color = "blue";
  console.log(color);
});

app.post('/changeangry', function(req, res) {
  mood = "angry";
  console.log(mood);
});
app.post('/changehappy', function(req, res) {
  mood="happy";
  console.log(mood);
});

app.post('/changesad', function(req, res) {
  mood="sad";
});
app.post('/skipf', function(req, res) {
  //skip
});
app.post('/skipb', function(req, res) {
  console.log("skipped back");
  //skipb
  //update mqqt
});
app.post('/pause', function(req, res) {
  if(pause==false){
    //pause
    //pause=true;
  }
});
app.get('/play', function(req, res) {
  if(pause==true){
    //pause
    //pause=false;
  }
});

app.get('/login', function(req, res) {

  // your application requests authorization

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: _clientId,
      scope: scope,
      redirect_uri: _redirecturi
    })
  );
});

const _getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
      },
    body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}
/*
async function updatePlaylist() {
  if(mood&&color !=""){
    var playlistID = color+"_"+mood;
    //play that ID
  }
};


async function getDevices() {
  const result = await fetch('https://api.spotify.com/v1/me/player/devices',{ method: 'GET'});
  return result;
};
*/



console.log('Listening on 8000');
app.listen(8000);
