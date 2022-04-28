
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const path = require('path');

const clientId = 'a7b734f818404ff08d6b4f34b7ad3c33'; // Your client id
const clientSecret = '56bbf4411c364f1498a9be9c22e92693'; // Your secret
var redirect_uri = 'http://localhost:8000'; // Your redirect uri

var SpotifyWebApi = require('spotify-web-api-js');

var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirect_uri
});

const app = express();

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

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
app.use('/dashboard', express.static(path.join(__dirname, 'public/dashboard.html')))


app.get('/login', function(req, res) {

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('/dashboard');
});


app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
 }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      res.send('Success! You can now close the window.');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

async function getTracks(playlistID) {
  const data = await spotifyApi.getPlaylistTracks(playlistID, {offset:1,limit:100,fields:'items'});
  return data;
};

console.log(getTracks("6xqlE2TVcOh0YUmJSNH0uX"));


console.log('Listening on 8000');
app.listen(8000);
