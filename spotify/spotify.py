import requests
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import pandas as pd

SPOTIPY_CLIENT_ID=’your-client-id’
SPOTIPY_CLIENT_SECRET=’your-client-secret’
SPOTIPY_REDIRECT_URI=’your-redirect-uri’
SCOPE = “user-top-read”

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET, redirect_uri=SPOTIPY_REDIRECT_URI, scope=SCOPE))

results = sp.current_user_top_tracks()results = sp.current_user_top_tracks()
