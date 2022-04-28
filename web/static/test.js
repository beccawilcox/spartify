

const clientId = 'a7b734f818404ff08d6b4f34b7ad3c33'; // Your client id
const clientSecret = '56bbf4411c364f1498a9be9c22e92693'; // Your secret
var redirect_uri = 'http://localhost:8000'; // Your redirect uri


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

const _getDevices = async (token) => {
  const result = await fetch(`https://api.spotify.com/v1/me/player/devices`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  });
  const data = await result.json();
  return data.categories.items;
}

