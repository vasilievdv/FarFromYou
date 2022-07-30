/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserEdit from '../UserEdit/UserEdit';

function PersonalArea() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user && (
      <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <div className="collapse-title text-xl font-medium">
          {user.name}
        </div>
        <div className="collapse-content">
          <p>{user.email}</p>
          <p>bla</p>
        </div>
      </div>
      )}
      <UserEdit />
    </div>
  );
}

export default PersonalArea;
