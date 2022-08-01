import React from 'react';
import { useSelector } from 'react-redux';
import './Message.css';

function Message({
  author, message, time, own,
}) {
  const user = useSelector((state) => state.user);
  return (
    <div className={author !== user.userName ? 'chat-item own' : 'chat-item'}>

      <p className="message">{message}</p>
      <div className="metadata-block">
        <span className="timestamp small-text">{time}</span>
        <span className="author small-text">
          by
          {'  '}
          {author}
        </span>
      </div>

    </div>
  );
}

export default Message;
