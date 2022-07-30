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
    <>
      <form>
        <label>
          Выберите комнату:
          <select value={roomall.id} onChange={roomHandler}>
            {roomall
            && roomall.map((el) => (<option key={uuidv4()} value={el.id}>{el.roomName}</option>))}
          </select>
        </label>
      </form>
      <button type="submit" onClick={guestHandler} className="btn btn-outline-info">Присоединиться к комнате</button>
    </>
  );
}

export default Join;
