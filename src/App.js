import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import AppStyle from './globalStyle';
import { getMemberInfo } from './services/ChlorineService';
import JoinPage from './views/JoinPage';
import PartyPage from './views/PartyPage';

const App = () => {
  const member = useMemberInformation();

  return (
    <Router>
      <div>
        <Header member={member} />
        <Route path="/player" exact component={PartyPage} />
        <Route path="/join/" exact component={JoinPage} />
        <AppStyle />
      </div>
    </Router>
  );
};

function useMemberInformation() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        setMember(await getMemberInfo());
      } catch (error) {
        console.error(error);
      }
    }
    prepare();
  }, []);

  return member;
}

export default App;
