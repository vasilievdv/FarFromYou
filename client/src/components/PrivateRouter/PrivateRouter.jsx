import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  // const auth = useSelector((state) => state.user);
  const id = useParams();
  const navigate = useNavigate();
  const authUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/`, {
      credentials: 'include',
    });
    if (!response.ok) {
      navigate('/auth/signin');
    }
    // console.log('++++++++', result);
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    children
  );
}

export default PrivateRoute;
