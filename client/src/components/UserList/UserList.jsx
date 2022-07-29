import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as endPoints from '../../config/endPoints';
import { disableLoader, enableLoader } from '../../redux/actions/loaderAction';
import Loader from '../Loader/Loader';

function UserList() {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    dispatch(enableLoader());
    fetch(endPoints.getAllUsers(), { credentials: 'include' })
      .then((response) => response.json())
      .then((users) => setList(users))
      .catch((e) => console.error('>>>>>>>>>', e))
      .finally(() => {
        dispatch(disableLoader());
      });
  }, []);

  if (loader) return <Loader />;

  if (list.length === 0) return <p>Not users</p>;

  return (

    <div className="d-flex justify-content-center">
      <div className="list-group">
        {list.map((user) => (
          <Link
            key={user.id}
            className={`list-group-item list-group-item-action ${
              userId === user.id ? 'active' : ''
            }`}
            to={`/users/${user.id}`}
          >
            {user.userName}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserList;
