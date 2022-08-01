import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateRoom() {
  const [input, setInput] = useState({});
  const [userall, setUserall] = useState([]);
  const [guest, setGuest] = useState({ id: '' });
  const navigate = useNavigate();
  const user = useSelector((state) => (state.user));

  useEffect(() => {
    fetch('http://localhost:3001/createroom', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => setUserall(date));
  }, []);

  const valueHandle = (e) => {
    setGuest((prev) => ({ ...prev, id: e.target.value }));
  };
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createHandler = async () => {
    const response = await fetch('http://localhost:3001/createroom', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      navigate(`/room/${result.id}`);
    }
  };

  // console.log(guest);
  if (user) {
    return (
      <form>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Введите название комнаты</h2>
            <input name="name" type="text" value={input.name || ''} onChange={inputHandler} className="input select-bordered" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div className="card-actions justify-end">
              {/* <h2 className="card-title">Выберите гостя</h2>
              <select value={guest.id} onChange={valueHandle}
              className="select select-bordered w-full max-w-xs">
                <option disabled selected>Выберите гостя</option>
                {userall
            && userall.map((el) => (<option key={uuidv4()} value={el.id}>{el.userName}</option>))}
              </select> */}
              <button type="button" onClick={createHandler} className="btn btn-primary">Создать комнату</button>
            </div>
          </div>
        </div>
      </form>
    );
  } return (
    <div>You not auth</div>
  );
}

export default CreateRoom;
