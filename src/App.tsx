import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Canvas from './_pub/Canvas'
import { history } from './store/configureStore';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Canvas}></Route>
      </Switch>
    </Router>
  );
}

export default App;
