import React, { useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import config from '../config/config.json';
import { CONNECT_SUCCESS, ON_MESSAGE_SUCCESS } from '../store/reducer/websocket';
import * as base from '../store/reducer/base';


const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const userName = useSelector((store: any) => store.websocket.userName, shallowEqual);
  const userRole = useSelector((store: any) => store.websocket.userRole, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);

  const webSocketUrl = `ws://${config.socketServer.host}:${config.socketServer.port}/${config.socketServer.path}?userId=${userId}&roomId=${roomId}`
  let ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
      dispatch({ type: CONNECT_SUCCESS });

      sendJoinMessage();
    }
    ws.current.onclose = error => {
      console.log("disconnect from " + webSocketUrl);
      console.log(error);
    };
    ws.current.onmessage = (evt: MessageEvent) => {
      const data = JSON.parse(evt.data) // { messageType: '', sender: {id: '', name:'', roomId: '', role: 1}, chat: '', drawing: { ... } }
      console.log(evt.data)
      dispatch({ type: ON_MESSAGE_SUCCESS, payload: data })
    };
    ws.current.onerror = error => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
      
      dispatch({
        type: base.OPEN_DIALOG, payload: {
          type: 'error',
          title: '소켓 연결 실패',
          contents: '연결에 실패 하였습니다.'
        }
      })
    };
  }

  const sendJoinMessage = () => {
    /** JOIN message send */
    ws.current!!.send(JSON.stringify({
      messageType: "JOIN",
      sender: { id: userId, name: userName, roomId: roomId, role: userRole },
    }))

  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
}