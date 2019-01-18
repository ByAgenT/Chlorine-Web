import React from 'react';
import styled from 'styled-components';

import List from '../List';
import TrackListItem from '../TrackListItem';

const SpotifyPlaylist = () => (
  <SpotifyPlaylistContainer>
    <List>
      <TrackListItem />
      <TrackListItem />
      <TrackListItem />
    </List>
    <PlaylistBottomBar>
      <a>Hello</a>
    </PlaylistBottomBar>
  </SpotifyPlaylistContainer>  
);


const SpotifyPlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const PlaylistBottomBar = styled.div`
  height: 2.5rem;
  color: white;
  background-color: red;
`;

export default SpotifyPlaylist;