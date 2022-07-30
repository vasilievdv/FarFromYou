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
      navigate('/room');
    }
  };
  // console.log(roomall);

  console.log(finroom);
  return (
    <form>
      <label>
        Выберите комнату:
        <select value={finroom.id} onChange={roomHandler}>
          {roomall
            && roomall.map((el) => (<option key={uuidv4()} value={el.id}>{el.roomName}</option>))}
        </select>
      </label>
      <button type="button" onClick={guestHandler} className="btn btn-outline-info">Присоединиться к комнате</button>
    </form>
  );
}

export default Join;
