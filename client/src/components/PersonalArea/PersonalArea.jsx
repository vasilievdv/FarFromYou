/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoPA from '../InfoPA/InfoPA';

function PersonalArea() {
  const user = useSelector((state) => state.user);
  const [info, setInfo] = useState({});

  const infoPA = async () => {
    console.log('id');
    const response = await fetch(`${process.env.REACT_APP_HOST}/user/PA`, {
      credentials: 'include',
    });
    console.log('tut');
    const result = await response.json();
    console.log('666666', result);
    setInfo(result);
    console.log(info);
  };
  useEffect(() => {
    infoPA();
  }, []);

  return (
    <div>
      {user && (
        <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <div className="collapse-title text-xl font-medium">
            Personal Area -
            {' '}
            {user?.userName}
          </div>
          <div className="collapse-content">
            {/* <p>

            {' '}
            {user.email}
          </p> */}
          </div>
        </div>
      )}
      <InfoPA nameTracks={info.nameTracks} nameRooms={info.nameRooms} />
    </div>
  );
}

export default PersonalArea;
