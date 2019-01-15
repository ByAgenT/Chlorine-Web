import React from 'react';
import styled from 'styled-components';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';


const Panel = (props) => (
  <PanelContainer>
    <PanelHeader>{props.name}</PanelHeader>
    <PanelBody>{props.children}</PanelBody>
  </PanelContainer>
);

const PanelContainer = styled.div`
  border: 1px solid #616467;
  margin: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export default Panel;