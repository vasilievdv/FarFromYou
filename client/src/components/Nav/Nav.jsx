import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function Nav() {
  const user = useSelector((state) => state.user);

  return (

    <div className="navbar bg-info">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          Far From You
        </Link>
        <div className="navbar">
          <ul className="menu menu-horizontal p-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signout"
                    className="nav-link"
                  >
                    Sign out
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    className="nav-link"
                  >
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/user/PA"
                    className="nav-link"
                  >
                    {user.userName}
                  </NavLink>
                </li>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" alt="bla" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signup"
                    className="nav-link"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signin"
                    className="nav-link"
                  >
                    Sign In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>

  );
}

export default Nav;
