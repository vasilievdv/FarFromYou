/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Track.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import socket from '../../socket';
import { getAudioAC } from '../../redux/actions/audioActions';

function Track() {
  const audioFromServer = useSelector((state) => state.audio);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [artist, setArtist] = useState('');
  const [trackName, setTrackName] = useState('');

  const id = useParams();

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('audiofile', audio);

      await axios.post(`${process.env.REACT_APP_HOST}/api/upload`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })

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
      <div className="card track-card">
        {audioFromServer && audioFromServer.map((el) => (
          // item.map((el) => (
          <div className="track-item">
            <div className="artist-name">{el[1]}</div>
            <div className="track-name">{el[2]}</div>
          </div>
          // ))
        ))}

      </div>
      <label htmlFor="my-modal-4" className="btn modal-button btn-primary">Add track</label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
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
        </label>
      </label>
    </div>

  );
}

export default Track;
