import React, { ReactNode, useRef } from 'react';
import config from '../config/config.json';
import { useDispatch } from 'react-redux';

import {CONNECT_SUCCESS} from '../store/reducer/websocket'

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://${config.socketServer.host}:${config.socketServer.port}/${config.socketServer.drawPath}`
  let ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
      dispatch({type: CONNECT_SUCCESS})
    }
    ws.current.onclose = error => {
      console.log("disconnect from " + webSocketUrl);
      console.log(error);
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
}