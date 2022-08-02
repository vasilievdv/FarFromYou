/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './Track.css';
import axios from 'axios';

import { getAudioAC } from '../../redux/actions/audioActions';

function Track() {
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  // const inputFiles = { audio, author, title };

  const sendFile = useCallback(async () => {
    // console.log(audio);
    try {
      const data = new FormData();
      data.append('audiofile', audio);

      await axios.post('http://localhost:3001/api/upload', data, {
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
    setAuthor(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className="pleer">
      <br />
      <label htmlFor="my-modal-4" className="btn modal-button btn-primary">Add track</label>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <input
            onChange={handleAuthorChange}
            type="text"
            name="artist"
            placeholder="Автор"
            className="input input-ghost w-full max-w-xs"
          />
          <input
            onChange={handleTitleChange}
            type="text"
            name="trackname"
            placeholder="Название трека"
            className="input input-ghost w-full max-w-xs"
          />
          <input
            onChange={(e) => setAudio(e.target.files[0])}
            type="file"
            name="choosefile"
            placeholder="Выбрать файл"
            // className="input input-ghost w-full max-w-xs"
          />
          <button
            onClick={sendFile}
            type="submit"
            className="btn modal-button btn-primary"
          >
            Добавить
          </button>
        </label>
      </label>
    </div>

  );
}

export default Track;
