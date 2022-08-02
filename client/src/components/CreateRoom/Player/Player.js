import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getAudioThunk, getAudioAC } from '../../../redux/actions/audioActions';
import socket from '../../../socket';

// const socket = io.connect('${process.env.REACT_APP_HOST}');//

function Player({ nameCreater }) {
  const audioFromServer = useSelector((state) => state.audio);
  const user = useSelector((state) => (state.user));

  // console.log('+++++++++++++', audioFromServer);
  // console.log(user);

  // console.log(audioFromServer);
  const dispatch = useDispatch();

  const clientAudio = new Audio();
  let adminStop = false;
  function clientAudioStop() {
    clientAudio.pause();
    adminStop = false;
    // console.log(adminStop);
  }
  useEffect(() => {
    dispatch(getAudioThunk());
  }, []);

  const [role, setRole] = useState('');

  function showTime(m) {
    console.log('tyt', m);
    if (user.userName !== nameCreater) {
      clientAudio.pause();
      clientAudio.src = m.path;
      clientAudio.currentTime = m.timecode;
      clientAudio.play();
    }
  }

  let stopCheck = true;
  const audio = new Audio();
  function adminPlay(m) {
    let i = 0;
    let currentPlay = m[i];
    console.log('tyt', user.userName === nameCreater);
    if (user.userName === nameCreater) {
      audio.setAttribute('controls', 'controls');
      // eslint-disable-next-line prefer-destructuring
      audio.src = currentPlay;
      audio.play();
      setInterval(() => {
        // console.log(audio.paused);
        if (audio.paused && stopCheck) {
          // eslint-disable-next-line no-plusplus
          ++i;
          // console.log(i);
          currentPlay = m[i];
          audio.src = currentPlay;
          audio.play();
          socket.emit('next', { timecode: audio.currentTime, path: currentPlay });
        }
        if (!audio.paused) {
          socket.emit('sendTime', { timecode: audio.currentTime, path: currentPlay });
        }
      }, 100);
    }
  }

  socket.on('time', showTime);
  socket.on('next', showTime);
  socket.on('stop', clientAudioStop);

  function handleAudioNext() {
    audio.pause();
  }
  function handleAudioStop() {
    stopCheck = false;
    audio.pause();
    socket.emit('stop', { });
  }

  useEffect(() => {
    socket.emit('time', { }); // При загрузке пользователь получает таймкод и адрес
  }, []);
  // function handleTimecode() {
  //   socket.emit('time', { }); // поулчить таймкод и адрес по кнопке
  // }

  function handlePlaySound() {
    adminPlay(audioFromServer);
  }

  return (
    <>
      <br />
      <br />
      <button type="button" onClick={() => setRole('client')}>Client__</button>
      <button type="button" onClick={() => setRole('server')}>Server__</button>
      <button type="button" onClick={handlePlaySound}>Play sound!</button>
      <br />
      <br />
      <div>
        <button type="button" onClick={handleAudioNext}>NEXT!__</button>
        <button type="button" onClick={handleAudioStop}>!STOP</button>
      </div>
      <br />
      <br />
      {/* <button type="button" onClick={handleTimecode}>Get time</button> */}

    </>

  );
}

export default Player;
