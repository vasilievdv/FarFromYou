import React, { useEffect, useState } from 'react';
import './InfoPA.css';

function InfoPA() {
  const fetchInfo = async () => {
    // console.log('id', id);
    const [info, setInfo] = useState([]);
    const response = await fetch(`${process.env.REACT_APP_HOST}/user/PA`, {
      credentials: 'include',
    });
    console.log('tut');
    const result = await response.json();
    console.log(result);

    useEffect(() => {
      fetchInfo();
    }, []);
  };

  return (
    <div className="userspa">
      <div className="card1">
        <div className="card-body scroll-block">
          <h2 className="card-title">Rooms</h2>
          <div className="btn-group" />

          <div className="card-actions justify-end" />
        </div>
      </div>
      <div className="card1">
        <div className="card-body scroll-block">
          <h2 className="card-title">Tracks</h2>
          <div className="btn-group" />

          <div className="card-actions justify-end" />
        </div>
      </div>
      <div className="card1">
        <div className="card-body scroll-block">
          <h2 className="card-title">User Edit</h2>
          <div className="btn-group" />

          <div className="card-actions justify-end" />
        </div>
      </div>
    </div>
  );
}
export default InfoPA;
