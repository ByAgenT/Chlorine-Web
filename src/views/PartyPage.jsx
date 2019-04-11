import React from 'react';
import Panel from '../components/Panel';
import PartyContainer from '../containers/PartyContainer';
import RootPartyContainer from '../containers/RootPartyContainer';
import Player from '../components/Player';
import { connectPlayer } from '../services/SpotifyPlaybackService';
import SpotifyPlaylist from '../components/SpotifyPlaylist/SpotifyPlaylist';

class PartyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {},
      player: null,
      creator: false
    };
  }

  async componentDidMount() {
    try {
      const token = await this.getSpotifyToken();
      this.setState({ token }, async () => {
        console.log('Spotify token received.');
        try {
          const player = await this.getSpotifyPlayer();
          this.setState({ player }, () => {
            console.log('Spotify player connected.');
            this.state.player.connect();
          });
        } catch (error) {
          // TODO: definetely try to handle this.
          console.log(error);
        }
      });
    } catch (error) {
      // TODO: definetely try to handle this.
      console.log(error);
    }
  }

  async getSpotifyToken() {
    const response = await fetch('/token');
    return response.json();
  }

  async getSpotifyPlayer() {
    // TODO: add rejection case;
    return new Promise(resolve => {
      this.playerReceiveInterval = setInterval(() => {
        let player = connectPlayer(this.state.token.access_token);
        if (player) {
          clearInterval(this.playerReceiveInterval);
          resolve(player);
        }
      }, 1000);
    });
  }

  render() {
    return (
      <RootPartyContainer>
        <PartyContainer direction="column">
          <Panel name="Playlist">
            <SpotifyPlaylist />
          </Panel>
        </PartyContainer>
        <PartyContainer direction="column">
          <Panel name="Members" />
          <Panel name="Player">
            <Player player={this.state.player} />
          </Panel>
        </PartyContainer>
      </RootPartyContainer>
    );
  }
}

export default PartyPage;
