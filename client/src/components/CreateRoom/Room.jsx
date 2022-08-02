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

function Room() {
  const id = useParams();
  const user = useSelector((state) => (state.user));
  const navigate = useNavigate();
  const [guests, setGuests] = useState([]);
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

  // find All Tracks

  if (info.info) {
    return (
      <div className="private">
        <GuestsInfo
          info={info}

        />
        <div className="track">
          <SearchPannel />
        </div>
        {/* Компонент с плеером */}
        <div className="chat">
          <div className="mockup-phone">
            <div className="camera" />
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                <Chat />
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
