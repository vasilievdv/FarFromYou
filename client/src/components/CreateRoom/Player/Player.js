import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAudioThunk, getAudioAC } from '../../../redux/actions/audioActions';
import socket from '../../../socket';

function Player({ nameCreater }) {
  const audioFromServer = useSelector((state) => state.audio);
  const user = useSelector((state) => (state.user));

  console.log('+++++++++++++', audioFromServer);
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
  const roomId = useParams();

  useEffect(() => {
    dispatch(getAudioThunk(roomId.id));
  }, []);

  const [role, setRole] = useState('');

  function showTime(m) {
    console.log(m);
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
    // console.log('tyt', user.userName === nameCreater);
    // try {
    //   if (user.userName === nameCreater) {
    //     audio.setAttribute('controls', 'controls');
    //     // eslint-disable-next-line prefer-destructuring
    //     audio.src = currentPlay;

    //     audio.play();
    //     setInterval(() => {
    //       // console.log(audio.paused);
    //       if (audio.paused && stopCheck) {
    //         // eslint-disable-next-line no-plusplus
    //         ++i;
    //         // console.log(i);
    //         currentPlay = m[i];
    //         audio.src = currentPlay;
    //         audio.play();
    //         socket.emit('next', { timecode: audio.currentTime, path: currentPlay });
    //       }
    //       if (!audio.paused) {
    //         socket.emit('sendTime', { timecode: audio.currentTime, path: currentPlay });
    //       }
    //     }, 100);
    //   }
    // } catch (error) {
    //   console.log(error.message);

    console.log(currentPlay, '--------.............');
    if (user.userName === nameCreater) {
      // eslint-disable-next-line prefer-destructuring
      audio.src = currentPlay;
      audio.play();
      setInterval(() => {
        if (audio.paused && stopCheck) {
          // eslint-disable-next-line no-plusplus
          ++i;
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

  function tracksForAll() {
    dispatch(getAudioThunk(roomId.id));
  }
  socket.on('time', showTime);
  socket.on('next', showTime);
  socket.on('stop', clientAudioStop);
  socket.on('tracksForAll', tracksForAll);

  function handleAudioNext() {
    audio.pause();
  }
  function handleAudioStop() {
    stopCheck = false;
    audio.pause();
    socket.emit('stop', {});
  }

  useEffect(() => {
    // console.log('dfdfdfd');
    socket.emit('time', { }); // При загрузке пользователь получает таймкод и адрес
  }, []);

  function handleTimecode() {
    socket.emit('time', { }); // поулчить таймкод и адрес по кнопке
  }

  function handlePlaySound() {
    adminPlay(audioFromServer);
  }

  return (
    <div className="player-btn-group">
      {user.userName !== nameCreater
    && <button type="button" className="btn btn-ghost" onClick={handleTimecode}>Start</button>}
      {user.userName === nameCreater
    && (
    <>
      <button type="button" className="btn player-btn" onClick={handlePlaySound}>Start</button>
      <button type="button" className="btn player-btn" onClick={handleAudioNext}>Next</button>
      <button type="button" className="btn player-btn" onClick={handleAudioStop}>Stop</button>
    </>
    )}
    </div>

  );
}

export default Player;
