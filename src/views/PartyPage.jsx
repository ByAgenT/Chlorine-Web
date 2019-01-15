import React from 'react';
import PanelView from '../components/Panel/PanelView';
import PanelContainer from '../containers/PanelContainer';


class PartyPage extends React.Component {
  render() {
    return (
      <PanelContainer>
        <PanelContainer direction="column">
          <PanelView name="Playlist" />
        </PanelContainer>
        <PanelContainer direction="column">
          <PanelView name="Members" />
          <PanelView name="Player" />
        </PanelContainer>
      </PanelContainer>
    );
  }
}

export default PartyPage;