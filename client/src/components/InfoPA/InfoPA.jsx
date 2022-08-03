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
        <div className="card1">
          <div className="card-body scroll-block">
            <h2 className="card-title">Rooms</h2>
            <div className="btn-group" />
            {nameRooms && nameRooms.map((el) => (<p>{el}</p>))}
            <div className="card-actions justify-end" />
          </div>
        </div>
        <div className="card1">
          <div className="card-body scroll-block">
            <h2 className="card-title">Tracks</h2>
            <div className="btn-group" />
            {nameTracks && nameTracks.map((el) => (<p>{el}</p>))}
            <div className="card-actions justify-end" />
          </div>
        </div>
        <div className="card1">
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
