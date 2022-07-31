import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import socket from '../../socket';
import Message from './Message/Message';

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const user = useSelector((state) => state.user);
  const roomID = useParams();
  const bottomRef = useRef(null);

  socket.on('message', (message) => {
    console.log(message);
  });

  const messageHandler = (event) => {
    const msg = event.target.value;
    setNewMessage(msg);
  };

  const sendHandler = async () => {
    if (newMessage !== '') {
      const messageData = {
        room: roomID.id,
        author: user.userName,
        message: newMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };
      await socket.emit('send_message', messageData);
    }
  };
  useEffect(() => {
    socket.on('recieve_message', (msg) => {
      console.log('front', msg);
      setMessageList((prev) => [...prev, msg]);
    });
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [newMessage]);
  return (
    <div className="chat-contaitner">
      <ScrollToBottom className="message-block">
        <div className="message-block-inner">
          {messageList.map((el) => (
            <Message
            // key={Date.now()}
              author={el.author}
              message={el.message}
              time={el.time}
            />
          ))}
        </div>
      </ScrollToBottom>
      <div className="chat-input-block">
        <textarea className="chat-input" placeholder="Напиши мне" onChange={messageHandler} />
        <button type="button" className="send-message-btn" onClick={sendHandler}>Отправить</button>
      </div>
    </div>
  );
}

export default Chat;
