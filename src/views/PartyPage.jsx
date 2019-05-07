import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';
import Panel from '../components/Panel';
import Player from '../components/Player';
import SpotifyPlaylist from '../components/SpotifyPlaylist/SpotifyPlaylist';
import PartyContainer from '../containers/PartyContainer';
import RootPartyContainer from '../containers/RootPartyContainer';
import {
  getRoomMembers,
  getToken,
  searchTracks
} from '../services/ChlorineService';
import { connectPlayer } from '../services/SpotifyPlaybackService';
import TextInput from '../components/TextInput';
import SongSearchResultList from '../components/SongSearchResultList';

import debounce from 'lodash/debounce';

const PartyPage = () => {
  const player = useSpotifyPlayer();
  const members = useMembersList();
  const [isModalShowed, setModalShowed] = useState(false);
  const { searchResult, setSongQuery } = useSongSearch();

  const updateSongQuery = debounce(event => {
    setSongQuery(event.target.value);
  }, 200);

  function onSearchModalChange(event) {
    event.persist();
    updateSongQuery(event);
  }

  return (
    <RootPartyContainer>
      <PartyContainer direction="column">
        <Panel name="Playlist">
          <SpotifyPlaylist
            onAddSongClick={() => setModalShowed(!isModalShowed)}
          />
        </Panel>
      </PartyContainer>
      <PartyContainer direction="column">
        <Panel name="Members">
          <List>
            {members.map(member => {
              return <ListItem key={member.id}>{member.name}</ListItem>;
            })}
          </List>
        </Panel>
        <Panel name="Player">
          <Player player={player} />
        </Panel>
      </PartyContainer>
      <Modal display={isModalShowed}>
        <h1>Search Songs</h1>
        <TextInput placeholder="Enter Track" onChange={onSearchModalChange} />
        <SongSearchResultList songs={searchResult} />
      </Modal>
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
        const player = await getSpotifyPlayer(token);
        player.connect();
        setPlayer(player);
      } catch (error) {
        console.log(error);
      }
    }

    prepare();
  }, []);

  return player;
}

function useSongSearch() {
  const [songQuery, setSongQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(
    () => {
      async function prepare() {
        if (songQuery) {
          try {
            const songs = await searchTracks(songQuery);
            setSearchResult(songs.tracks.items);
          } catch (error) {
            console.log('Song search error');
            console.error(error);
          }
        }
      }

      prepare();
    },
    [songQuery]
  );

  return { searchResult, setSongQuery };
}

export default withRouter(PartyPage);
