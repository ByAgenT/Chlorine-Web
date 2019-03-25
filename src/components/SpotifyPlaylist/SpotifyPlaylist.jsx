import React from 'react';
import styled from 'styled-components';

import List from '../List';
import TrackListItem from '../TrackListItem';
import LinkButton from '../LinkButton';

const SpotifyPlaylist = () => (
  <SpotifyPlaylistContainer>
    <PlaylistList>
      <TrackListItem />
      <TrackListItem />
    </PlaylistList>
    <PlaylistBottomBar>
      <LinkButton>Add Songs</LinkButton>
      <LinkButton>Shuffle</LinkButton>
    </PlaylistBottomBar>
  </SpotifyPlaylistContainer>  
);


const SpotifyPlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const PlaylistBottomBar = styled.div`
  display: flex;
  height: 2.5rem;
  color: white;
  background-color: #292929;
  align-items: center;
`;

const PlaylistList = styled(List)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  max-height: 50em;
`;


export default SpotifyPlaylist;