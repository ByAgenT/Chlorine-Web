import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Panel from '../components/Panel';
import Player from '../components/Player';
import SpotifyPlaylist from '../components/SpotifyPlaylist/SpotifyPlaylist';
import PartyContainer from '../containers/PartyContainer';
import RootPartyContainer from '../containers/RootPartyContainer';
import List from '../components/List';
import ListItem from '../components/ListItem';
import { getToken, getRoomMembers } from '../services/ChlorineService';
import { connectPlayer } from '../services/SpotifyPlaybackService';

const PartyPage = () => {
  const player = useSpotifyPlayer();
  const members = useMembersList();

  return (
    <RootPartyContainer>
      <PartyContainer direction="column">
        <Panel name="Playlist">
          <SpotifyPlaylist />
        </Panel>
      </PartyContainer>
      <PartyContainer direction="column">
        <Panel name="Members">
          <List>
            {members.map(member => {
              return <ListItem>{member.name}</ListItem>;
            })}
          </List>
        </Panel>
        <Panel name="Player">
          <Player player={player} />
        </Panel>
      </PartyContainer>
    </RootPartyContainer>
  );
};

function useMembersList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        const members = await getRoomMembers();
        setMembers(members);
      } catch (error) {
        console.error(error);
      }
    }

    prepare();
  }, []);

  return members;
}

function useSpotifyPlayer() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const getSpotifyToken = async function() {
      return await getToken();
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

export default withRouter(PartyPage);
