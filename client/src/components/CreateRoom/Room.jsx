import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../../socket';
import Chat from '../Chat/Chat';
import InputWithButton from '../Forms/InputWithBtn/InputWithButton';
import Track from '../Track/Track';
import './CreateRoom.css';
import './Room.css';

function Room() {
  const id = useParams();
  const user = useSelector((state) => (state.user));
  const guest = useSelector((state) => state.guest);

  const [info, setInfo] = useState([]);
  console.log(user);

  console.log(id.id);

  const roomFetch = async () => {
    console.log('tut');
    const response = await fetch(`http://localhost:3001/room/${id.id}`, {
      credentials: 'include',
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    setInfo(result);
  };
  console.log(info.info);
  useEffect(() => {
    roomFetch();
  }, []);

  console.log('+++++++++++++', info);

  if (info.info) {
    return (
      <div className="private">
        <div className="table1">
          <div className="card room-creator-card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Имя комнаты:
                {' '}
                {info.info.roomName}
              </h2>
              <h2 className="card-title">
                Создатель:
                {' '}
                {info.authorRoom.userName}
              </h2>
              <p>Track:linkin Park. Scorpions. 30 Seconds to Mars</p>
              <div className="card-actions justify-end" />
            </div>
          </div>

          <div className="card guests-card bg-base-100 shadow-xl">
            <div className="card-body scroll-block">
              <h2 className="card-title">Гости</h2>
              <p className="p">Track:linkin Park</p>
              <p className="p">Scorpions</p>
              <p className="p">30 Seconds to Mars</p>
              <p className="p">Track:linkin Park</p>
              <p className="p">Scorpions</p>
              <p className="p">30 Seconds to Mars</p>
              <p className="p">Track:linkin Park</p>
              <p className="p">Scorpions</p>
              <p className="p">30 Seconds to Mars</p>
              <p className="p">Track:linkin Park</p>
              <p className="p">Scorpions</p>
              <p className="p">30 Seconds to Mars</p>
              <p className="p">Track:linkin Park</p>
              <p className="p">Scorpions</p>
              <p className="p">30 Seconds to Mars</p>
              <div className="btn-group" />

              <div className="card-actions justify-end" />
            </div>
          </div>
          <div className="btn1">
            <button type="submit" className="btn">Покинуть комнату</button>
            <button type="submit" className="btn btn-primary ">Удалить комнату</button>
          </div>
        </div>
        <div className="track">
          <InputWithButton placeholder="Поиск" btnText="Искать" />
          <ul className="tracklist scroll-block">
            <li className="track"><Track /></li>
          </ul>
          <div className="btn1 add-btn">
            <button type="button" className="btn btn-primary ">Добавить трек</button>
          </div>
        </div>
        <div className="chat">
          <div className="mockup-phone">
            <div className="camera" />
            <div className="display">
              <div className="artboard artboard-demo phone-1">
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } return (
    <div>You not auth</div>
  );
}
export default Room;
