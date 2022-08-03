import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { disableLoader, enableLoader } from '../../redux/actions/loaderAction';
import Loader from '../Loader/Loader';
import * as endPoints from '../../config/endPoints';
import { editUser } from '../../redux/actions/userAction';

function UserEdit() {
  const [userEdit, setUserEdit] = useState({
    email: '',
    userName: '',
  });

  const loader = useSelector((state) => state.loader);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableLoader());
    if (user) {
      fetch(endPoints.getUser(user.id), { credentials: 'include' })
        .then((response) => response.json())
        .then((userData) => setUserEdit((prev) => ({
          ...prev,
          email: userData.email,
          userName: userData.userName,
        })))
        .finally(() => {
          dispatch(disableLoader());
        });
    }
  }, []);

  const changeHandler = (e) => {
    setUserEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.entries(userEdit);
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(editUser(payload, navigate));
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left" />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Edit</span>
              </label>
              <input
                onChange={changeHandler}
                value={userEdit.email}
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={changeHandler}
                value={userEdit.userName}
                type="password"
                name="userName"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
