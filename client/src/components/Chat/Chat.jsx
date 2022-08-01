import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import socket from '../../socket';
import Message from './Message/Message';
import InputWithButton from '../Forms/InputWithBtn/InputWithButton';

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const user = useSelector((state) => state.user);
  const roomID = useParams();

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
      setNewMessage('');
    });
  }, [socket]);

  return (
    <div className="chat-contaitner">
      <ScrollToBottom className="message-block">
        <div className="message-block-inner">
          {messageList.map((el, i) => (
            <Message
              key={i}
              author={el.author}
              message={el.message}
              time={el.time}
            />
          ))}
        </div>
      </ScrollToBottom>
      <InputWithButton placeholder="Напиши мне" changeAction={messageHandler} clickAction={sendHandler} btnText="Отправить" />
    </div>
  );
}

export default Chat;
