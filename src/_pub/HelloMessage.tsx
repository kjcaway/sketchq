import React, { useEffect, useState, useRef } from 'react'

function HelloMessage() {
  const webSocketUrl = "ws://localhost:8080/greetings";
  const ws = useRef<WebSocket | null>(null);
  const [name, setName] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if(!connected){
      ws.current = new WebSocket(webSocketUrl);
      
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setConnected(true)
      };
      ws.current.onerror = error => {
        console.log("could not connect to " + webSocketUrl);
        console.log(error);
      };
      ws.current.onmessage = (evt: MessageEvent) => {
        console.log(evt.data)
      };
      ws.current.onclose = error => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
      // return () => {
      //   if(ws.current){
      //     console.log("trying to disconnect..");
      //     ws.current.close();
      //   }
      // }
    }
  }, [connected])

  const onChange = (e:any) => {
    setName(e.target.value)
  }

  const onSubmit = () => {
    if(connected && ws.current){
      const msg = { "name": name };
      ws.current.send(JSON.stringify(msg));
    }
  }

  const onClickDisconnect = () => {
    if(connected && ws.current){
      ws.current.close()
    }
  }

  return (
    <div>
      hello message text!
      <br/>
      <input type="text" value={name} onChange={onChange}></input>
      <button type="button" onClick={onSubmit}>Send!</button>
      <br/>
      <button type="button" onClick={onClickDisconnect}>Disconnect!</button>
    </div>
  )
}

export default HelloMessage
