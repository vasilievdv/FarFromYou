import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/createorguest', {
      credentials: 'include',
    });
    //   .then((res) => console.log(res));
  }, []);

  const createHandler = () => {
    navigate('/createroom');
  };

  const guestHandler = () => {
    navigate('/join');
  };
  return (
    <>
      <div>Welcome</div>
      <button type="submit" onClick={createHandler} className="btn btn-outline-info">Создать комнату</button>
      <button type="submit" onClick={guestHandler} className="btn btn-outline-info">Присоединиться к комнате</button>
    </>
  );
}

export default Welcome;
