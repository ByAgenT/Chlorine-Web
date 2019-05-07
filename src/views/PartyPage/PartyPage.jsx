import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import Modal from '../../components/Modal';
import Panel from '../../components/Panel';
import Player from '../../components/Player';
import SongSearchResultList from '../../components/SongSearchResultList';
import SpotifyPlaylist from '../../components/SpotifyPlaylist/SpotifyPlaylist';
import TextInput from '../../components/TextInput';
import PartyContainer from '../../containers/PartyContainer';
import RootPartyContainer from '../../containers/RootPartyContainer';
import { useMembersList, usePlaybackInformation, useSongSearch, useSpotifyPlayer } from './hooks';

const PartyPage = () => {
  const player = useSpotifyPlayer();
  const members = useMembersList();
  const playback = usePlaybackInformation(player);
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
          <Player player={player} playback={playback} />
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

export default withRouter(PartyPage);
