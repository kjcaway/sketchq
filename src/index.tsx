import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from "react-redux";
import store from "./store/configureStore";
import WebSocketProvider from './hoc/WebSocketProvider';

ReactDOM.render(
  <Provider store={store}>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </Provider>
  ,
  document.getElementById('root')
);

