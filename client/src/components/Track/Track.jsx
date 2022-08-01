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
        Audio not supported by your browser.
        <a href="audio/music.mp3">Download music</a>
      </audio>
      <br />
      <label htmlFor="my-modal-4" className="btn modal-button btn-primary">Add track</label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <input type="text" placeholder="Author" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Name of the track" className="input input-ghost w-full max-w-xs" />
          <input type="text" placeholder="Select file" className="input input-ghost w-full max-w-xs" />
          <button type="submit" className="btn btn-ghost">Add </button>
        </label>
      </label>
    </div>

  );
}

export default Track;
