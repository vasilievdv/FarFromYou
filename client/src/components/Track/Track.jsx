/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './Track.css';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { getAudioAC } from '../../redux/actions/audioActions';

function Track() {
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
        .then((res) => dispatch(getAudioAC(res.data.path)));
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
      <br />

      <label htmlFor="my-modal-3" className="btn modal-button">open modal</label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn2 btn-sm btn-circle absolute right-2 top-2">✕</label>
          <label className="modal-box-3 relative" htmlFor="" />
          <br />
          <input
            onChange={handleAuthorChange}
            type="text"
            name="artist"
            placeholder="
            singer"
            className="input input-ghost w-full max-w-xs"
            value={artist}
          />
          <input
            onChange={handleTitleChange}
            type="text"
            name="trackname"
            placeholder="
            Name track"
            className="input input-ghost w-full max-w-xs"
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
    </div>
  );
}

export default Track;
