import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CreateRoom() {
  const [input, setInput] = useState({});
  // const [userall, setUserall] = useState([]);
  const [guest, setGuest] = useState({ id: '' });
  const navigate = useNavigate();
  const user = useSelector((state) => (state.user));

  // useEffect(() => {
  //   fetch('${process.env.REACT_APP_HOST}/createroom', {
  //     credentials: 'include',
  //   })
  //     .then((res) => (res.json()))
  //     .then((date) => setUserall(date));
  // }, []);

  const valueHandle = (e) => {
    setGuest((prev) => ({ ...prev, id: e.target.value }));
  };
  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createHandler = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/createroom`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (response.ok) {
      const result = await response.json();
      // console.log(result);
      navigate(`/room/${result.id}`);
    }
    // console.log('++++++++', result);
  };

  if (user) {
    return (
      <form>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Enter room name</h2>
            <input name="name" type="text" placeholder="name" value={input.name || ''} onChange={inputHandler} className="input select-bordered" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div className="card-actions justify-end">
              <button type="button" onClick={createHandler} className="btn btn-primary">Create a room</button>
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
