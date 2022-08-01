import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// import Chat from '../Chat/Chat';

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
  console.log('++++++', roomall);

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
    if (response.ok) {
      navigate(`/room/${room.id}`);
    }
  };
  console.log(roomall.id);
  if (user && roomall) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Music for you</h2>
          {console.log(finroom)}
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
          </select>
          <div className="card-actions justify-end">
            <button type="button" onClick={guestHandler} className="btn btn-primary">Join the room</button>
          </div>
        </div>
      </div>
    );
  } return (
    <div>You not auth</div>
  );
}

export default Join;
