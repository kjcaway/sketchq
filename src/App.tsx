import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Canvas from './_pub/Canvas'
import HelloMessage from './_pub/HelloMessage'
import { history } from './store/configureStore';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Canvas}></Route>
        <Route exact path="/helloMessage" component={HelloMessage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
