import React from 'react';
import Track from '../Track/Track';
import './CreateRoom.css';

function Room() {
  return (
    <div className="private">
      <div className="track">
        <ul>
          <Track />
        </ul>
      </div>
      <div className="chat">
        <div className="mockup-phone">
          <div className="camera" />
          <div className="display">
            <div className="artboard artboard-demo phone-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
