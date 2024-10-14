import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket)
    }

    socket.onmessage = (message) => {
      console.log("Recieved message:", message.data);
      setMessages((m: any) => [...m, message.data])
    }

    setSocket(socket)
  }, []);

  if(!socket){
    return (
      <div>
        Loading...
      </div>
    )
  }

  let count = 0;

  return (
    <div>{messages.map((message: any) => <div key={count++}>{message}</div>)}</div>
  )
}

export default App
