import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useSelector } from 'react-redux';
import socket from '../../socket';
import Message from './Message/Message';

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState('');
  const user = useSelector((state) => state.user);

  socket.on('message', (message) => {
    console.log(message);
  });

  const outputMessage = (message) => {

  };
  const messageHandler = (event) => {
    const msg = event.target.value;

    setNewMessage(msg);
  };
  const sendHandler = async () => {
    if (newMessage !== '') {
      const messageData = {
        room,
        author: user.userName,
        message: newMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };
      await socket.emit('send_message', messageData);
    }
  };
  useEffect(() => {
    socket.on('recieve_message', (msg) => {
      console.log(msg);
    });
  }, [socket]);

  return (
    <div className="chat-contaitner">
      <div className="message-block">
        <Message />
      </div>
      <div className="chat-input-block">
        <textarea className="chat-input" placeholder="Напиши мне" onChange={messageHandler} />
        <button type="button" className="send-message-btn" onClick={sendHandler}>Отправить</button>
      </div>
    </div>
  );
}

export default Chat;
