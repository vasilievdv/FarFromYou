import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from '../Chat/Chat';
import Track from '../Track/Track';
import './CreateRoom.css';

function Room() {
  const cookie = useCookies(['name']);
  // console.log('tyt', cookie);
  const id = useParams();

  const user = useSelector((state) => (state.user));

  console.log(user);

  // console.log('+++++++++++++', id);

  if (user) {
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
  } return (
    <div>You not auth</div>
  );
}
export default Room;
