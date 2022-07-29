import React, { useEffect, useState } from 'react';

function CreateRoom() {
  const [input, setInput] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/createroom', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => console.log(date));
  }, []);

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div>CreateRoom</div>
      <input name="name" type="text" value={input.name || ''} onChange={inputHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    </>
  );
}

export default CreateRoom;
