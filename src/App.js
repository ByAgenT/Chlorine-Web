import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderView from './components/Header/HeaderView';
import AppStyle from './globalStyle';
import JoinPage from './views/JoinPage';
import PartyPage from './views/PartyPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderView/>
          <Route path="/" exact component={PartyPage} />
          <Route path="/join/" exact component={JoinPage} />
          <AppStyle/>
        </div>
      </Router>
    );
  }
}

export default App;
