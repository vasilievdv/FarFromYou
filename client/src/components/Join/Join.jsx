import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import socket from '../../socket';

function Join() {
  const [roomall, setRoomall] = useState([]);
  const [finroom, setFinroom] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => (state.user));
  useEffect(() => {
    fetch('http://localhost:3001/join', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => setRoomall(date));
  }, []);

  const roomHandler = (e) => {
    setFinroom((prev) => ({ ...prev, id: e.target.value }));
  };

  const guestHandler = async () => {
    const room = finroom || roomall[0];
    const response = await fetch('http://localhost:3001/join', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(room), // передать выбранную комнату
    });
    // console.log('Emilys', room);

    if (response.ok) {
      await socket.emit('send_guest', user.userName);
      navigate(`/room/${room.id}`);
    }
  };

  // console.log(finroom.id);
  if (user && roomall) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Музыка для вас</h2>
          <select value={finroom?.id} onChange={roomHandler} className="select select-bordered w-full max-w-xs">
            {/* <option disabled selected>Выберите комнату</option> */}
            {roomall
            && roomall.map((el) => (
              <option
                key={uuidv4()}
                value={el.id}
              >
                {el.roomName}
              </option>
            ))}
            {/* {roomall.length === 1(
              <option key={uuidv4()} value={roomall[0].id} selected>
                {roomall[0].roomName}
              </option>,
            )} */}
            {/* {roomall[1]
            && roomall.map((el) => (
              <option key={uuidv4()} value={el.id}>
                {el.roomName}
              </option>
            ))} */}
          </select>
          <div className="card-actions justify-end">
            <button type="button" onClick={guestHandler} className="btn btn-primary">Присоединиться к комнате</button>
          </div>
        </div>
      </div>
    );
  } return (
    <div>You not auth</div>
  );
}

export default Join;
