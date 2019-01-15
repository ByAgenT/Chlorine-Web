import React from 'react';
import Panel from '../components/Panel';
import PartyContainer from '../containers/PartyContainer';
import List from '../components/List';


class PartyPage extends React.Component {
  render() {
    return (
      <PartyContainer>
        <PartyContainer direction="column">
          <Panel name="Playlist">
            <List />
          </Panel>
        </PartyContainer>
        <PartyContainer direction="column">
          <Panel name="Members">

          </Panel>
          <Panel name="Player">

          </Panel>
        </PartyContainer>
      </PartyContainer>
    );
  }
}

export default PartyPage;