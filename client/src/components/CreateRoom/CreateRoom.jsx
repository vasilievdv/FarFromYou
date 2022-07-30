/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Track from '../Track/Track';
import './CreateRoom.css';

function CreateRoom() {
  const [input, setInput] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/createroom', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => console.log(date));
  }, []);

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div>
        <input
          value={input.name || ''}
          onChange={inputHandler}
          name="name"
          type="text"
          placeholder="name"
          className="input input-bordered
        input-md w-full max-w-xs"
        />
        <div className="form-control">
          <div className="input-group">
            <button type="button" className="btn btn-primary">Добвить гостя</button>
            <button type="button" className="btn btn-primary">Информация</button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li className="nav-item">
          <NavLink
            to="/room"
            className="nav-link"
          >
            Кабинет
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default CreateRoom;
