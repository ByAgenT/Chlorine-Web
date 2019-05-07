import React from 'react';
import styled from 'styled-components';
import ListItem from '../ListItem';
import List from '../List';

const MembersList = ({ members }) => (
  <List>
    {members.map(member => {
      return <MembersListItem key={member.id}>{member.name}</MembersListItem>;
    })}
  </List>
);

const MembersListItem = styled(ListItem)`
  font-size: 1.5em;
`;

export default MembersList;