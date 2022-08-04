import React, { useEffect, useState } from 'react';
import UserEdit from '../UserEdit/UserEdit';
import './InfoPA.css';

function InfoPA({ nameRooms, nameTracks }) {
  console.log('nameRooms', nameRooms);
  console.log('nameTracks', nameTracks);

  // const [info, setInfo] = useState([]);
  if (nameRooms) {
    return (
      <div className="userspa">
        <div className="card3">
          <div className="card-body scroll-block">
            <h2 className="card-title">Rooms</h2>
            <div className="btn5-group" />
            <div className="textcentr">
              {nameRooms && nameRooms.map((el) => (<p className="myp">{el}</p>))}
            </div>
            <div className="card-actions justify-end" />
          </div>
        </div>
        <div className="card3">
          <div className="card-body scroll-block">
            <h2 className="card-title">Tracks</h2>
            <div className="btn-group" />
            <div className="textcentr">
              {nameTracks && nameTracks.map((el) => (<p className="myp">{el}</p>))}
            </div>
            <div className="card-actions justify-end" />
          </div>
        </div>
        <div className="card3">
          <div className="card-body scroll-block">
            <h2 className="card-title">User Edit</h2>
            <div className="usered">
              <UserEdit />
            </div>
            <div className="btn-group" />
            <div className="card-actions justify-end" />
          </div>
        </div>
      </div>
    );
  }
}
export default InfoPA;
