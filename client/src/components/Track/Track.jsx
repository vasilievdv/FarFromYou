/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Track.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';
import { getAudioAC } from '../../redux/actions/audioActions';
import socket from '../../socket';

function Track() {
  const audioFromServer = useSelector((state) => state.audio);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [artist, setArtist] = useState('');
  const [trackName, setTrackName] = useState('');

  const id = useParams();
  // const inputFiles = { artist, trackName };
  // console.log(inputFiles);

  // const inputFiles = { artist, trackName };
  // console.log(inputFiles);

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('audiofile', audio);

      await axios.post(`${process.env.REACT_APP_HOST}/api/upload`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        // .then((res) => setPlay(res.data.path));
        .then((res) => {
          dispatch(getAudioAC(res.data.path));
          socket.emit('tracksForAll', { });
        });
    } catch (error) {
      // console.log(error);
    }
  }, [audio]);

  const handleAuthorChange = (e) => {
    setArtist(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTrackName(e.target.value);
  };

  const addTrackHandler = async () => {
    // console.log(artist, trackName);
    const response = await fetch(`${process.env.REACT_APP_HOST}/audio/createtrack`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist, trackName, room_id: id }),
    });
    sendFile();
  };

  return (
    <div className="pleer">
      <label htmlFor="my-modal-3" className="btn modal-button">ADD FILE</label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn2 btn-sm absolute right-5 top-2">x</label>
          <label className="modal-box-3 relative" htmlFor="" />
          <br />
          <input
            onChange={handleAuthorChange}
            type="text"
            name="artist"
            placeholder="
            Artist"
            className="input input-artist input-ghost w-full max-w-xs"
            value={artist}
          />
          <input
            onChange={handleTitleChange}
            type="text"
            name="trackname"
            placeholder="
            Track Name"
            className="input input-trackname input-ghost w-full max-w-xs"
            value={trackName}
          />
          <input
            onChange={(e) => setAudio(e.target.files[0])}
            type="file"
            name="choosefile"
            placeholder="Выбрать файл"
          // className="input input-ghost w-full max-w-xs"
          />
          <button
            onClick={addTrackHandler}
            type="submit"
            className="btn modal-button btn-primary"
          >
            ADD
          </button>
        </div>
      </div>
      <br />
      {/* <div className="card track-card">
        {audioFromServer && audioFromServer.map((el, index) => (
          // item.map((el) => (
          <div className="track-item">
            <div className="artist-name" key={uuidv4()}>{el[1]}</div>
            <div className="track-name" key={uuidv4()}>{el[2]}</div>
          </div>
          // ))
        ))}
      </div> */}
    </div>
  );
}

export default Track;
