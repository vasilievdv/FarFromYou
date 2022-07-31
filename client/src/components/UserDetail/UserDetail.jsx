import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { disableLoader, enableLoader } from '../../redux/actions/loaderAction';
import Loader from '../Loader/Loader';
import * as endPoints from '../../config/endPoints';

function UserDetail() {
  const navigate = useNavigate();

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

  const createHandler = () => {
    navigate('/users');
  };

  if (loader) return <Loader />;

  if (!currentUser) return null;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{currentUser.userName}</h2>
        <h2 className="card-title">{currentUser.email}</h2>
        <p>Track:linkin Park. Scorpions. 30 Seconds to Mars</p>
        <div className="card-actions justify-end">
          <button type="submit" onClick={createHandler} className="btn btn-primary">prev</button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
