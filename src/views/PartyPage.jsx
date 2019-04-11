import React, { useEffect, useState } from 'react';
import Panel from '../components/Panel';
import PartyContainer from '../containers/PartyContainer';
import RootPartyContainer from '../containers/RootPartyContainer';
import Player from '../components/Player';
import { connectPlayer } from '../services/SpotifyPlaybackService';
import SpotifyPlaylist from '../components/SpotifyPlaylist/SpotifyPlaylist';

function useSpotifyPlayer() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const getSpotifyToken = async function() {
      const response = await fetch('/token');
      return response.json();
    };

    async function getSpotifyPlayer(token) {
      return new Promise(resolve => {
        const playerReceiveInterval = setInterval(() => {
          let player = connectPlayer(token.access_token);
          if (player) {
            clearInterval(playerReceiveInterval);
            resolve(player);
          }
        }, 1000);
      });
    }

    async function prepare() {
      try {
        const token = await getSpotifyToken();
        setPlayer(await getSpotifyPlayer(token));
      } catch (error) {
        console.log(error);
      }
    }

    prepare();
  }, []);

  return player;
}

const PartyPage = () => {
  const player = useSpotifyPlayer();

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
          <Player player={player} />
        </Panel>
      </PartyContainer>
    </RootPartyContainer>
  );
};

export default PartyPage;
