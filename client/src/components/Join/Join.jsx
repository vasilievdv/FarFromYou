import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Join() {
  const [roomall, setRoomall] = useState([]);
  const [finroom, setFinroom] = useState({ id: '' });
  const navigate = useNavigate();

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
    const response = await fetch('http://localhost:3001/join', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(finroom), // передать выбранную комнату
    });
    // console.log('+++++++', response);

    if (response.ok) {
      navigate(`/room/${finroom.id}`);
    }
  };
  // console.log(roomall);

  // console.log(finroom.id);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Музыка для вас</h2>
        <select value={finroom.id} onChange={roomHandler} className="select select-bordered w-full max-w-xs">
          <option disabled selected>Выберите комнату</option>
          {roomall
            && roomall.map((el) => (<option key={uuidv4()} value={el.id}>{el.roomName}</option>))}
        </select>
        <div className="card-actions justify-end">
          <button type="button" onClick={guestHandler} className="btn btn-primary">Присоединиться к комнате</button>
        </div>
      </div>
    </div>
  );
}

export default Join;
