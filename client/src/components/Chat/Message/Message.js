import React from 'react';
import './Message.css';

function Message({ own }) {
  return (
    <div className={own ? 'chat-item own' : 'chat-item'}>
      <p className="message">hfhfhhhhhhhhhhh</p>
      <p className="timestamp">1 hour ago</p>
    </div>
  );
}

export default Message;
