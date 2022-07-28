import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function Nav() {
  const user = useSelector((state) => state.user);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">
            FarmFromYou
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
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
                      to="/user/edit"
                      className="nav-link"
                    >
                      Edit
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
    </nav>
  );
}

export default Nav;
