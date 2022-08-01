/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import io from 'socket.io-client';
import audio from './audio/Nirvana.mp3';

const socket = io.connect('http://localhost:3001');

function Track() {
  return (
    <audio controls>
      <track src={audio} type="audio/ogg; codecs=vorbis" />
      <track src={audio} type="audio/mpeg" />
      Тег audio не поддерживается вашим браузером.
      <a href="audio/music.mp3">Скачайте музыку</a>
    </audio>
  );
}

export default Track;
