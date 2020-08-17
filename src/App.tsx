import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Canvas from './containers/Canvas'
import Viewer from './containers/Viewer'
import Room from './pages/Room'
import Main from './pages/Main'
import { history } from './store/configureStore';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route path="/room/:roomId" component={Room}></Route>
        <Route path="/canvas" component={Canvas}></Route>
        <Route path="/viewer" component={Viewer}></Route>
      </Switch>
    </Router>
  );
}

export default App;
