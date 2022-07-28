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
    <div className="d-flex justify-content-center">
      <form
        onSubmit={submitHandler}
        className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
      >
        <legend className="text-center mb-4">User Edit</legend>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            className="form-control"
            value={userEdit.email}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={changeHandler}
            className="form-control"
            value={userEdit.userName}
            type="text"
            name="userName"
            placeholder="Name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    </div>
  );
}

export default UserEdit;
