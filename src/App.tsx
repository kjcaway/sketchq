import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Room from './pages/Room'
import Main from './pages/Main'
import Who from './pages/Who'
import Rooms from './pages/Rooms'
import { history } from './store/configureStore';
import RoomRoute from './hoc/RoomRoute';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <RoomRoute path="/room/:roomId" component={Room}></RoomRoute>
        <Route path="/who/:roomId" component={Who}></Route>
        <Route path="/rooms" component={Rooms}></Route>
      </Switch>
    </Router>
  );
}

export default App;
