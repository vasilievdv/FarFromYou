import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../Chat/Chat';
import Track from '../Track/Track';
import './CreateRoom.css';

function Room() {
  const id = useParams();

  setInterval(() => {
    console.log('+++++++++++++', id);
  }, 5000);

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
            <div className="artboard artboard-demo phone-1"><Chat /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
