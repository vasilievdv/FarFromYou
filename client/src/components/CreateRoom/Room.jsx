import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../socket';
import Chat from '../Chat/Chat';
import Track from '../Track/Track';
import SearchBar from './SearchBar';
import './Room.css';
import './CreateRoom.css';
import GuestsInfo from './GuestsInfo/GuestsInfo';
import SearchPannel from './SearchPannel/SearchPannel';
import Player from './Player/Player';

function Room() {
  const id = useParams();
  const user = useSelector((state) => (state.user));
  // const navigate = useNavigate();
  // const [guests, setGuests] = useState([]);

  const [info, setInfo] = useState([]);

  const roomFetch = async () => {
    const response = await fetch(`http://localhost:3001/room/${id.id}`, {
      credentials: 'include',
    });
    const result = await response.json();
    setInfo(result);
  };
  useEffect(() => {
    roomFetch();
  }, []);
  // console.log('++++++++++++', info);

  // find All Tracks

  if (user) {
    return (
      <div className="private">
        <GuestsInfo
          nameCreater={info.nameCreater}
          nemeRoom={info.nemeRoom}
          arrGuest={info.arrGuest}
        />
        <div className="track">
          <SearchPannel />
          <Player info={info} />
        </div>
        <div className="chat">
          <div className="mockup-phone">
            <div className="camera" />
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                <Chat />
                1
              </div>
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
