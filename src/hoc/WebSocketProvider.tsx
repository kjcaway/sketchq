import React, { ReactNode, useRef } from 'react';
import config from '../config/config.json';

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://${config.socketServer.host}:${config.socketServer.port}/${config.socketServer.drawPath}`
  let ws = useRef<WebSocket | null>(null);

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
    }
    ws.current.onmessage = (e: MessageEvent) => {
      console.log(e.data)
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
}