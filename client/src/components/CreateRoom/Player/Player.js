import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAudioThunk, getAudioAC } from '../../../redux/actions/audioActions';
import socket from '../../../socket';
import useDebounce from '../../../Debounce/Debounce';

function Player({ nameCreater }) {
  const audioFromServer = useSelector((state) => state.audio);
  const user = useSelector((state) => (state.user));

  const dispatch = useDispatch();

  const clientAudio = new Audio();
  clientAudio.addEventListener('canplaythrough', (event) => { });

  let adminStop = false;
  function clientAudioStop() {
    clientAudio.pause();
    adminStop = false;
    clientAudio.src = null;
    clientAudio.currentTime = null;
  }
  const roomId = useParams();

  useEffect(() => {
    // clientAudio.pause();
    dispatch(getAudioThunk(roomId.id));
  }, []);

  function showTime(m) {
    console.log('client timeCode', m);
    if (user?.userName !== nameCreater) {
      clientAudio.pause();
      clientAudio.src = m.path;
      clientAudio.currentTime = m.timecode;
      clientAudio.play();
    }
  }

  let stopCheck = true;
  const audio = new Audio();
  audio.addEventListener('canplaythrough', (event) => { });

  function adminPlay(m) {
    let i = 0;
    let currentPlay = m[i][0];
    if (user.userName === nameCreater) {
      // eslint-disable-next-line prefer-destructuring
      audio.src = currentPlay;
      audio.play();
      setInterval(() => {
        if (audio.paused && stopCheck) {
          // eslint-disable-next-line no-plusplus
          ++i;
          if (i > m.length - 1) {
            i = 0;
          }
          // eslint-disable-next-line prefer-destructuring
          currentPlay = m[i][0];
          audio.src = currentPlay;
          audio.play();
          console.log(m, 'lkjadfkajsdfksdg');
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
  useEffect(() => {
    socket.on('next', showTime);
  }, [socket]);
  useEffect(() => {
    socket.on('time', showTime);
  }, [socket]);
  // socket.on('time', showTime);
  // socket.on('next', showTime);
  socket.on('stop', clientAudioStop);
  socket.on('tracksForAll', tracksForAll);

  // function handleAudioNext() {
  //   audio.pause();
  // }
  const handleAudioNext = useDebounce(() => audio.pause(), 300);

  function handleAudioStop() {
    stopCheck = false;
    audio.pause();
    socket.emit('stop', {});
  }

  useEffect(() => {
    socket.emit('time', {}); // При загрузке пользователь получает таймкод и адрес
  }, []);

  const handleTimecode = useDebounce(() => socket.emit('time', {}), 300);

  function handlePlaySound() {
    stopCheck = true;
    adminPlay(audioFromServer);
  }

  return (
    <div className="player-btn-group">
      {user?.userName !== nameCreater
        && <button type="button" className="btn player-btn" onClick={handleTimecode}>Start</button>}

      {user?.userName === nameCreater
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
