import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';
import SignOut from './components/Forms/SignOut/SignOut';
import Nav from './components/Nav/Nav';
import SignUp from './components/Forms/SignUp/SignUp';
import SignIn from './components/Forms/SignIn/SignIn';
import { checkAuth } from './redux/actions/userAction';
import Main from './components/Main/Main';
import PersonalArea from './components/PersonalArea/PersonalArea';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Room from './components/CreateRoom/Room';
import Join from './components/Join/Join';
import Footr from './components/Footr/Footr';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
        <Route path="/users/:id" element={<PrivateRoute><UserDetail /></PrivateRoute>} />
        <Route path="/auth/signout" element={<PrivateRoute><SignOut /></PrivateRoute>} />
        <Route path="/user/PA" element={<PrivateRoute><PersonalArea /></PrivateRoute>} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/join" element={<Join />} />
      </Routes>
      <Footr />
    </div>
  );
}

export default App;
