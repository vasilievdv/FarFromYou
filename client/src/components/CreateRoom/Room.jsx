import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from '../Chat/Chat';
import Track from '../Track/Track';
import './CreateRoom.css';

function Room() {
  const cookie = useCookies(['name']);
  // console.log('tyt', cookie);
  const id = useParams();

  const user = useSelector((state) => (state.user));

  console.log(user);

  // console.log('+++++++++++++', id);

  if (user) {
    return (
      <div className="private">
        <div className="table1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Имя комнаты: РОК</h2>
              <h2 className="card-title">Создатель: IGOR</h2>
              <p>Track:linkin Park. Scorpions. 30 Seconds to Mars</p>
              <div className="card-actions justify-end" />
            </div>
          </div>
          <br />
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Гости</h2>
              <p className="p">Track:linkin Park</p>
              <p className="p">Scorpions</p>
              <p className="p">30 Seconds to Mars</p>
              <div className="btn-group" />
              <button type="submit" className="btn btn-primary ">Добавить</button>
              <div className="card-actions justify-end" />
            </div>
          </div>
          <div className="btn1">
            <button type="submit" className="btn">Удалить комнату</button>
          </div>
        </div>
        <div className="track">
          <ul>
            <Track />
          </ul>
        </div>
        <div className="chat">
          <div className="mockup-phone">
            <div className="camera" />
            <div className="display">
              <div className="artboard artboard-demo phone-1" />
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
