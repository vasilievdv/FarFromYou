import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as endPoints from '../../config/endPoints';
import { disableLoader, enableLoader } from '../../redux/actions/loaderAction';
import Loader from '../Loader/Loader';

function UserList() {
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader);
  const navigate = useNavigate();

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
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr onClick={() => navigate(`/users/${item.id}`)}>
              <th>{index + 1}</th>
              <td>{item.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
export default UserList;
