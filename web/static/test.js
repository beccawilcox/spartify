const axios = require('axios')

const clientId = 'a7b734f818404ff08d6b4f34b7ad3c33'; // Your client id
const clientSecret = '56bbf4411c364f1498a9be9c22e92693'; // Your secret
var redirect_uri = 'http://localhost:8000'; // Your redirect uri
var token = "BQAnroSqBEEs6sM16BCq7NQFdWwenN5b4mM8Q1gX6BdbJNCNLY9XO77_szkqxn3flFE3Q7Y3UmqgbyAVyJAqcEfRIMBsGzebItqDPxaXntm_LGdGNc73_YWoqnjXu_EZous37JrLaOYuhfwldACv00gRvMUTiyygwDB7e6niWhYO1Kqw0p7DTrQ";

const fs = require('fs')

const getstatus = async() => {
  try {
    return await axios.get('https://api.spotify.com/v1/me/player')
  } catch (error) {
    console.error(error)
  }
}

function skipf()  {
  axios.post('https://api.spotify.com/v1/me/player/next');
}

function skiptb(){
  axios.post('https://api.spotify.com/v1/me/player/previous');
}

console.log(getstatus);

(async () => {
  console.log(await getstatus)
})()
function pause(){
  axios.put('https://api.spotify.com/v1/me/player/pause');
}

function pause(){

}
