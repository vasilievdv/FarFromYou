import React from 'react';
import './Message.css';

function Message({ message, time, own }) {
  return (
    <div className={own ? 'chat-item own' : 'chat-item'}>
      <p className="message">jkl</p>
      <p className="timestamp">fghj</p>
    </div>
  );
}

export default Message;
