/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import io from 'socket.io-client';
import audio from './audio/Nirvana.mp3';
import './Track.css';

const socket = io.connect('http://localhost:3001');

function Track() {
  return (
    <div className="pleer">
      <audio controls>
        <track src={audio} type="audio/ogg; codecs=vorbis" />
        <track src={audio} type="audio/mpeg" />
        Тег audio не поддерживается вашим браузером.
        <a href="audio/music.mp3">Скачайте музыку</a>
      </audio>
      <br />
      <label htmlFor="my-modal-4" className="btn modal-button btn-primary">Добавить трек</label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <input type="text" placeholder="Автор" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Название трека" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Выбрать файл" className="input input-ghost w-full max-w-xs" />
          <button type="submit" className="btn btn-ghost">Добавить</button>
        </label>
      </label>
    </div>

  );
}

export default Track;
