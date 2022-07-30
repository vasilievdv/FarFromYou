import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const guestHandler = () => {
    const responce = fetch('http://localhost:3001/join', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(roomall), // передать выбранную комнату
    })
      .then((res) => (res.json()))
      .then((date) => console.log(date));
    if (responce.ok) { navigate('/room'); }
  };

  const roomHandler = (e) => {
    setFinroom((prev) => ({ ...prev, id: e.target.value }));
  };
  console.log(finroom);
  return (
    <>
      <form>
        <label>
          Выберите комнату:
          <select value={roomall.id} onChange={roomHandler}>
            {roomall && roomall.map((el) => (<option value={el.id}>{el.roomName}</option>))}
          </select>
        </label>
      </form>
      <button type="submit" onClick={guestHandler} className="btn btn-outline-info">Присоединиться к комнате</button>
    </>
  );
}

export default Join;
