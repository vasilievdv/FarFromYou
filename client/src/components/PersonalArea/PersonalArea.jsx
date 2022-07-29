/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as endPoints from '../../config/endPoints';
import UserEdit from '../UserEdit/UserEdit';
import { disableLoader, enableLoader } from '../../redux/actions/loaderAction';

function PersonalArea() {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  
  useEffect(() => {
    fetch('http;//localhost3000/user/PA')
      .then((res) => res.json())
      .then((users) => setUser(users))
      .catch((e) => console.error('bla', e));
  }, []);

  return (
    <div>
      <UserEdit />
      <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <div className="collapse-title text-xl font-medium">
          <Link
            key={user.id}
            className={`list-group-item list-group-item-action ${userId === user.id ? 'active' : ''
            }`}
            to={`/user/PA/${user.id}`}
          >
            {user.userName}
          </Link>
        </div>
        <div className="collapse-content">
          <p>blabla</p>
        </div>
      </div>
    </div>
  );
}

export default PersonalArea;
