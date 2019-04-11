import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import AppStyle from './globalStyle';
import JoinPage from './views/JoinPage';
import PartyPage from './views/PartyPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" exact component={PartyPage} />
          <Route path="/join/" exact component={JoinPage} />
          <AppStyle />
        </div>
      </Router>
    );
  }
}

export default App;
