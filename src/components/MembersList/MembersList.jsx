import React from 'react';
import styled from 'styled-components';
import ListItem from '../ListItem';
import List from '../List';
import LinkButton from '../LinkButton';

const MembersList = ({ members }) => (
  <MemberListContainer>
    <List>
      {members.map(member => {
        return <MembersListItem key={member.id}>{member.name}</MembersListItem>;
      })}
    </List>
    <MemberListBottomBar>
      <LinkButton>Settings</LinkButton>
    </MemberListBottomBar>
  </MemberListContainer>
);

const MembersListItem = styled(ListItem)`
  font-size: 1.5em;
`;

const MemberListBottomBar = styled.div`
  display: flex;
  height: 2.5rem;
  color: white;
  background-color: #292929;
  align-items: center;
`;

const MemberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export default MembersList;
