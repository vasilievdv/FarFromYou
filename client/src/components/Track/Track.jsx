/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import audio from './audio/Nirvana.mp3';
import './Track.css';

function Track() {
  const socket = io.connect('http://localhost:3001');

  const createAudioHandler = () => {

  };

  return (
    <div className="pleer">
      <audio controls>
        <track src={audio} type="audio/ogg; codecs=vorbis" />
        <track src={audio} type="audio/mpeg" />
        Audio not supported by your browser.
        <a href="audio/music.mp3">Download music</a>
      </audio>
      <br />
      <label htmlFor="my-modal-4" className="btn modal-button btn-primary">Add track</label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-5 top-2">✕</label>
          <input type="text" placeholder="Автор" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Название трека" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Выбрать файл" className="input input-ghost w-full max-w-xs" />
          <button type="submit" onClick={createAudioHandler} className="btn btn-ghost">Добавить</button>
        </label>
      </label>
    </div>

  );
}

export default Track;
