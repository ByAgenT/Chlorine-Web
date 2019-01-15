import React from 'react';

import Panel from './Panel';
import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';

class PanelView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;

    return (
      <Panel>
        <PanelHeader>{name}</PanelHeader>
        <PanelBody></PanelBody>
      </Panel>
    );
  }
}

export default PanelView;