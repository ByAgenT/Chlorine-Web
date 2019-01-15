import styled from 'styled-components';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  flex-grow: 1;
`;

export default PanelContainer;