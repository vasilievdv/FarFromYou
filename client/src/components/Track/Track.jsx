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
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left" />
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Автор</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Название трека</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Добавить трек</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Track;
