import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ placeholder, audioAll }) {
  const [findaudio, setFindaudio] = useState([]);
  const [auidio, setAuidio] = useState([]);
  console.log('-----------------+', auidio);

  const heandlerFilter = (e) => {
    const searchAuidio = e.target.value;
    const newFilter = audioAll.filter((value) => value.artist.toLowerCase()
      .includes(searchAuidio.toLowerCase()));
    setFindaudio(newFilter);
    if (searchAuidio === '') {
      setFindaudio([]);
    } else { setFindaudio(newFilter); }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input text="text" placeholder={placeholder} onChange={heandlerFilter} />
        {/* <select value={findaudio?.id}
        onChange={auidioHandler} className="select select-bordered w-full max-w-xs"> */}
        <div className="searchIcon">
          <SearchIcon />
        </div>
      </div>
      {findaudio.length !== 0 && (
        <div className="audioResult">
          <div className="card guests-card bg-base-100 shadow-xl">
            <div className="card-body scroll-block">
              <h2 className="card-title">Track</h2>
              <div className="btn-group" />
              {findaudio && findaudio.slice(0, 15).map((el) => (
                <div className="modalsearch" key={uuidv4()} value={el.id} onClick={() => setAuidio((prev) => [...prev, el])}>
                  {el.artist}
                  {' '}
                  ||
                  {' '}
                  {el.trackName}
                </div>
              ))}
              <div className="card-actions justify-end" />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default SearchBar;
