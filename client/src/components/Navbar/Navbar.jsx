import React from 'react';

function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">FarfromYou</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li><a>SignUp</a></li>
            <li><a>SignIn</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
