import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';
import UserEdit from './components/UserEdit/UserEdit';
import SignOut from './components/Forms/SignOut/SignOut';
import Nav from './components/Nav/Nav';
import SignUp from './components/Forms/SignUp/SignUp';
import SignIn from './components/Forms/SignIn/SignIn';
import { checkAuth } from './redux/actions/userAction';
import Main from './components/Main/Main';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <Nav />
      <div className="container py-5">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="/users/:id" element={<PrivateRoute><UserDetail /></PrivateRoute>} />
          <Route path="/user/edit" element={<PrivateRoute><UserEdit /></PrivateRoute>} />
          <Route path="/auth/signout" element={<PrivateRoute><SignOut /></PrivateRoute>} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
