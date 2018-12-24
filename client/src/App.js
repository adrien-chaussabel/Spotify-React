import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from'spotify-web-api-js';

const spotifyWebApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super()
    const params = this.getHashParams();
    const token = params.access_token;
    if (token){
      spotifyWebApi.setAccessToken(token);
    }
    this.state ={
      loggedIn: token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        albumArt: ''
      }
    }
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
      spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: response.item.artists[0].name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
        <a href = 'http://localhost:8888'>
          <button>Login With Spotify</button>
        </a>
        <div> Now Playing: {this.state.nowPlaying.name}</div>
        <div> By: {this.state.nowPlaying.artist}</div> 
        <div>
          <img src ={this.state.nowPlaying.albumArt} alt = "Album Art" style = {{width: 500}}/>
        </div>
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      </div>
    );
  }
}

export default App;
