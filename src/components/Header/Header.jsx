import React from 'react';
import styled from 'styled-components';

import Brand from './Brand';
import HeaderButton from './HeaderButton';
import HeaderMenu from './HeaderMenu';

const Header = () => (
  <HeaderContainer>
    <Brand>CHLORINE</Brand>
    <HeaderMenu>
      <HeaderButton href="/login">Create</HeaderButton>
      <HeaderButton href="/join">Join</HeaderButton>
    </HeaderMenu>
  </HeaderContainer>
);


const HeaderContainer = styled.header`
  background-color: black;
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Header;