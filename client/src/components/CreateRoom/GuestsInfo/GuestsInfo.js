import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../../socket';
import Player from '../Player/Player';
import './GuestsInfo.css';

function GuestsInfo({ nameCreater, nemeRoom, arrGuest }) {
//   console.log('00000', nameCreater, nemeRoom, arrGuest);
  const id = useParams();
  const user = useSelector((state) => (state.user));
  // const guest = useSelector((state) => state.guest);
  const navigate = useNavigate();
  const [guestsArr, setGuestsArr] = useState([]);

  useEffect(() => {
    socket.on('recieve_guest', (guest) => {
    //   console.log(info);
      setGuestsArr((prev) => [...prev, guest]);
    });
  }, [socket]);

  const deleteRoomHandler = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/room/${id.id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    navigate('/');
  };

  const exitRoomHandler = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/room/${id.id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    navigate('/');
  };

  if (nameCreater) {
    return (
      <div className="table">
        <div className="card room-creator-card bg-base-100 shadow-xl">
          <div className="card-body room-info">
            <h2 className="card-title">
              Room name:
              {' '}
              <div className="name">
                {nemeRoom}
              </div>
            </h2>
            <h2 className="card-title">
              Creator:
              {' '}
              <div className="name">
                {nameCreater}
              </div>
            </h2>
            <br />

            <div>
              <Player nameCreater={nameCreater} />
            </div>

          </div>
        </div>
        <div className="card guests-card bg-base-100 shadow-xl">
          <div className="card-body scroll-block">
            <h2 className="card-title name">Guests</h2>
            {arrGuest && arrGuest.map((el) => (<p>{el}</p>))}
            <div className="card-actions justify-end" />
          </div>
        </div>
        <div className="btn1">
          {nameCreater === user.userName
        && (
        <button
          type="submit"
          onClick={deleteRoomHandler}
          className="btn btn-primary "
        >
          Delete room
        </button>
        )}
          {nameCreater !== user.userName && (
          <button
            type="submit"
            onClick={exitRoomHandler}
            className="btn"
          >
            leave room
          </button>
          )}
        </div>
      </div>
    );
  }
}

export default GuestsInfo;
