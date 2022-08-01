import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="welcome-container">
        <div className="welcome-text-block">
          <div className="welcome">Welcome</div>
          <div className="welcome-text">to our streaming service. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic recusandae, tempore iusto placeat voluptatem cum dolor vero laborum illo velit? Nemo ipsa minus fugit reprehenderit rerum distinctio aut sit sequi.</div>
        </div>
        {user && (
          <div className="button-group">
            <button type="submit" onClick={createHandler} className="btn btn-outline-info">Create a room</button>
            <button type="submit" onClick={guestHandler} className="btn btn-outline-info">Join the room</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
