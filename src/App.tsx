import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import RoomRoute from './hoc/RoomRoute';
import NotFound from './pages/error/NotFount';
import Main from './pages/Main';
import Room from './pages/Room';
import Rooms from './pages/Rooms';
import Who from './pages/Who';
import { history } from './store/configureStore';


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <RoomRoute path="/room/:roomId" component={Room}></RoomRoute>
        <Route path="/who/:roomId" component={Who}></Route>
        <Route path="/rooms" component={Rooms}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  );
}

export default App;
