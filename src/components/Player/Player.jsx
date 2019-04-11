import React from 'react';
import styled from 'styled-components';
import PlayControl from './PlayerControls/PlayControl';
import BackControl from './PlayerControls/BackControl';
import PauseControl from './PlayerControls/PauseControl';
import NextControl from './PlayerControls/NextControl';
import ControlContainer from './ControlContainer';
import SongLine from './PlayerControls/SongLine';
import breakpoint from 'styled-components-breakpoint';

const Player = props => (
  <PlayerContainer>
    <TrackCover src="https://i.scdn.co/image/d0186ad64df7d6fc5f65c20c7d16f4279ffeb815" />
    <ControlContainer>
      <SongTitle>
        <span>The Killers</span>
        {' – '}
        <span>Mr. Brightside</span>
      </SongTitle>
      <SongLine duration={222200} now={130000} />
      <ButtonsContainer>
        <BackControl
          onClick={() => {
            props.player.previousTrack();
          }}
        />
        <PlayControl
          onClick={() => {
            props.player.resume();
          }}
        />
        <PauseControl
          onClick={() => {
            props.player.pause();
          }}
        />
        <NextControl
          onClick={() => {
            props.player.previousTrack();
          }}
        />
      </ButtonsContainer>
    </ControlContainer>
  </PlayerContainer>
);

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  color: white;
  padding: 20px;
`;

const TrackCover = styled.img`
  ${breakpoint('mobile')`
    width: 50px;
    height: 50px;
  `}

  ${breakpoint('desktop')`
    width: 170px;
    height: 170px;
  `}
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const SongTitle = styled.div`
  font-weight: 600;
  margin-bottom: 1em;

  ${breakpoint('mobile')`
    font-size: 1rem;
  `}

  ${breakpoint('desktop')`
    font-size: 1.6rem;
  `}
`;

export default Player;
