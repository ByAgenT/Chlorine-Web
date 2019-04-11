function connectPlayer(token) {
  if (window.Spotify) {
    let player = new window.Spotify.Player({
      name: 'Chlorine',
      getOAuthToken: cb => {
        cb(token);
      }
    });
    return new SpotifyPlayer(player);
  }
}

class SpotifyPlayer {
  constructor(player) {
    this.player = player;
  }

  async connect() {
    if (this.player !== undefined) {
      this.player.connect();
    }
  }

  async resume() {
    if (this.player !== undefined) {
      this.player.resume();
    }
  }

  async pause() {
    if (this.player !== undefined) {
      this.player.pause();
    }
  }

  async previousTrack() {
    if (this.player !== undefined) {
      this.player.previousTrack();
    }
  }
}

export { connectPlayer, SpotifyPlayer };
