import React from 'react';
import Header from './Header';
import Brand from './Brand';
import HeaderButton from './HeaderButton';
import HeaderMenu from './HeaderMenu';

const HeaderView = () => (
  <Header>
    <Brand>CHLORINE</Brand>
    <HeaderMenu>
      <HeaderButton href="/login">Create</HeaderButton>
      <HeaderButton href="/join">Join</HeaderButton>
    </HeaderMenu>
  </Header>
);

export default HeaderView;