import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateRoom() {
  const [input, setInput] = useState({});
  const [userall, setUserall] = useState([]);
  const [guest, setGuest] = useState({ id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/createroom', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => setUserall(date));
  }, []);

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createHandler = async () => {
    const response = await fetch('http://localhost:3001/createroom', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ input, guest }),
    });
    console.log('+++++++', response);
    if (response.ok) {
      navigate('/room');
    }
  };
  console.log(guest);
  const valueHandle = (e) => {
    setGuest((prev) => ({ ...prev, id: e.target.value }));
  };

  return (
    <>
      <div>CreateRoom</div>
      <input name="name" type="text" value={input.name || ''} onChange={inputHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      <form>
        <label>
          Выберите гостя:
          <select value={guest.id} onChange={valueHandle}>
            {userall
            && userall.map((el) => (<option key={uuidv4()} value={el.id}>{el.userName}</option>))}
          </select>
        </label>
        <button type="button" onClick={createHandler} className="btn btn-outline-info">Создать комнату</button>
      </form>
    </>
  );
}

export default CreateRoom;
