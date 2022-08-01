import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../socket';
import Chat from '../Chat/Chat';
import InputWithButton from '../Forms/InputWithBtn/InputWithButton';
import Track from '../Track/Track';
import SearchBar from './SearchBar';
import './Room.css';
import './CreateRoom.css';

function Room() {
  const id = useParams();
  const user = useSelector((state) => (state.user));
  // const guest = useSelector((state) => state.guest);
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

  const [audioAll, setAudioAll] = useState();

  const findAudioFetch = async () => {
    const response = await fetch('http://localhost:3001/audio', {
      credentials: 'include',
    });
    const result = await response.json();
    console.log(result);
    setAudioAll(result);
  };

  useEffect(() => {
    findAudioFetch();
  }, []);

  console.log('+++++++++++++', info);
  useEffect(() => {
    socket.on('recieve_guest', (guest) => {
      console.log('front', guest);
      setGuests((prev) => [...prev, guest]);
    });
  }, [socket]);

  const deleteRoomHandler = async () => {
    const response = await fetch(`http://localhost:3001/room/${id.id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    navigate('/');
  };

  const exitRoomHandler = async () => {
    const response = await fetch(`http://localhost:3001/room/${id.id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    navigate('/');
  };

  if (info.info) {
    return (
      <div className="private">
        <div className="table1">
          <div className="card room-creator-card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Room name:
                {' '}
                {info.info.roomName}
              </h2>
              <h2 className="card-title">
                Creator:
                {' '}
                {info.authorRoom.userName}
              </h2>
              <br />
              {info.authorRoom.id === user.id
                && (
                  <div>
                    <button type="submit" className="btn btn-ghost ">Start</button>
                    <button type="submit" className="btn btn-ghost ">Pause</button>
                    <button type="submit" className="btn btn-ghost ">Stop</button>
                  </div>
                )}

            </div>
          </div>
          <div className="card guests-card bg-base-100 shadow-xl">
            <div className="card-body scroll-block">
              <h2 className="card-title">Гости</h2>
              <div className="btn-group" />
              <div className="card-actions justify-end" />
            </div>
          </div>
          <div className="btn1">
            {info.authorRoom.id === user.id
              && <button type="submit" onClick={deleteRoomHandler} className="btn btn-primary ">Delete room</button>}
            {info.authorRoom.id !== user.id && <button type="submit" onClick={exitRoomHandler} className="btn">leave room</button>}
          </div>
        </div>
        <div className="track">
          <SearchBar placeholder="Enter a auidio name..." audioAll={audioAll} />
          <ul className="tracklist scroll-block">
            <li className="track"><Track /></li>
          </ul>
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
    <div>You not auth</div>
  );
}
export default Room;
