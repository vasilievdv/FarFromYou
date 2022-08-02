import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../../socket';

function GuestsInfo({ info }) {
  const id = useParams();
  const user = useSelector((state) => (state.user));
  // const guest = useSelector((state) => state.guest);
  const navigate = useNavigate();
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    socket.on('recieve_guest', (name) => {
      console.log(name);
      setGuests((prev) => [...prev, name]);
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

  return (
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
          {guests.map((el) => (<p>{el}</p>))}
          <div className="card-actions justify-end" />
        </div>
      </div>
      <div className="btn1">
        {info.authorRoom.id === user.id
        && <button type="submit" onClick={deleteRoomHandler} className="btn btn-primary ">Delete room</button>}
        {info.authorRoom.id !== user.id && <button type="submit" onClick={exitRoomHandler} className="btn">leave room</button>}
      </div>
    </div>
  );
}

export default GuestsInfo;
