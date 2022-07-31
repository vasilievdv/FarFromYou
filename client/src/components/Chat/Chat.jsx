import React from 'react';
import './Chat.css';
import Message from './Message/Message';

function Chat() {
  return (
    <div className="chat-contaitner">
      <div className="message-block">
        <Message />
        <Message own />
        <Message />
        <Message own />
        <Message />
      </div>
      <div className="chat-input-block">
        <textarea className="chat-input" placeholder="Напиши мне" />
        <button type="button" className="send-message-btn">Отправить</button>
      </div>
    </div>
  );
}

export default Chat;
