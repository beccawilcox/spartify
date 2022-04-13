import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth
import cred


scope1 = 'user-library-read'
scope2 = 'user-modify-playback-state'

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=cred.client_ID, client_secret= cred.client_SECRET))
sp1 = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cred.client_ID, client_secret = cred.client_SECRET, redirect_uri = cred.redirect_url, scope = scope1))
sp2 = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cred.client_ID, client_secret = cred.client_SECRET, redirect_uri = cred.redirect_url, scope = scope2))



#sp2.track(track_id = '7ixxyJJJKZdo8bsdWwkaB6?si=ec6770541e21481b', market=None)
#sp2.add_to_queue(uri='7ixxyJJJKZdo8bsdWwkaB6?si=ec6770541e21481b', device_id=None)
#sp2.next_track(device_id=None)

def skip():
  sp2.next_track(device_id=None)

def pause():
  sp2.pause_playback(device_id=None)

def unpause():
  sp2.start_playback(device_id=None, context_uri=None, uris=None, offset=None, position_ms=None)

def ric():
  sp2.pause_playback(device_id=None)
  list= ["https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=d3ab66b0e32240c3","https://open.spotify.com/track/6e40mgJiCid5HRAGrbpGA6?si=1af9951e20fc4174"]
  sp2.start_playback(device_id=None, context_uri=None, uris=list, offset=None, position_ms=None)





