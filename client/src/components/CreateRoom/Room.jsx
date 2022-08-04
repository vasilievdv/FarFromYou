import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../socket';
import Chat from '../Chat/Chat';
// import InputWithButton from '../Forms/InputWithBtn/InputWithButton';
// import Track from '../Track/Track';
import './Room.css';
import './CreateRoom.css';
import GuestsInfo from './GuestsInfo/GuestsInfo';
import SearchPannel from './SearchPannel/SearchPannel';
// import Player from './Player/Player';

function Room() {
  const id = useParams();
  const user = useSelector((state) => (state.user));
  const navigate = useNavigate();
  // const [guests, setGuests] = useState([]);

  const [info, setInfo] = useState({});
  const roomFetch = async () => {
    // console.log('id', id);
    const response = await fetch(`${process.env.REACT_APP_HOST}/room/${id.id}`, {
      credentials: 'include',
    });
    console.log('tut');
    if (!response.ok) {
      navigate('/');
    }
    const result = await response.json();
    console.log('+++++++++', result);
    setInfo(result);
    console.log('++++++++++++', info);
  };
  useEffect(() => {
    roomFetch();
  }, []);

  // find All Tracks

  if (info) {
    return (
      <div className="private">
        <GuestsInfo
          nameCreater={info.nameCreater}
          nemeRoom={info.nemeRoom}
          arrGuest={info.arrGuest}
        />
        <div className="track">
          <SearchPannel />
        </div>
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
    <div>You not authorized</div>
  );
}
export default Room;
