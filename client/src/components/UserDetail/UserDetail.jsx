import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { disableLoader, enableLoader } from '../../redux/actions/loaderAction';
import Loader from '../Loader/Loader';
import * as endPoints from '../../config/endPoints';

function UserDetail() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader);

  useEffect(() => {
    dispatch(enableLoader());
    fetch(`${endPoints.getUser(id)}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((user) => setCurrentUser(user))
      .catch((e) => console.error(e))
      .finally(() => {
        dispatch(disableLoader());
      });
  }, []);

  if (loader) return <Loader />;

  if (!currentUser) return null;

  return (
    <div className="d-flex justify-content-center">
      <div className="card text-center" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{currentUser.userName}</h5>
          <p className="card-text">{currentUser.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
