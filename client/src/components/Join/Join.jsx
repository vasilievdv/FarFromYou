import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Join() {
  const [roomall, setRoomall] = useState([]);
  const [finroom, setFinroom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/join', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => setRoomall(date));
  }, []);

  console.log(roomall);

  const guestHandler = async () => {
    const response = await fetch('http://localhost:3001/join', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(finroom), // передать выбранную комнату
    });
    // console.log('+++++++', response);

    if (response.ok) {
      console.log('+++++++', response);
      navigate('/room');
    }
  };

  const roomHandler = (e) => {
    setFinroom((prev) => ({ ...prev, id: e.target.value }));
  };
  console.log(finroom);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Музыка для вас</h2>
        <div className="card-actions justify-end">
          <button type="submit" onClick={guestHandler} className="btn btn-primary">Присоединиться к комнате</button>
        </div>
        <select value={roomall.id} onChange={roomHandler} className="select select-bordered w-full max-w-xs">
          <option disabled selected>Выберите комнату</option>
          {roomall
            && roomall.map((el) => (<option value={el.id}>{el.roomName}</option>))}
        </select>
      </div>
    </div>
  );
}

export default Join;
