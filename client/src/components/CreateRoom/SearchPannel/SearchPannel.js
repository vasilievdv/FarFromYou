import React, { useEffect, useState } from 'react';
import Track from '../../Track/Track';
import SearchBar from '../Searchbar/SearchBar';
import './SearchPannel.css';

function SearchPannel() {
  const [audioAll, setAudioAll] = useState();

  const findAudioFetch = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/audio`, {
      credentials: 'include',
    });
    const result = await response.json();
    // console.log(result);
    setAudioAll(result);
  };

  useEffect(() => {
    findAudioFetch();
  }, []);

  return (
    <div className="search-pannel">
      <Track />
      <div className="search-block">
        <SearchBar placeholder="Search for .." audioAll={audioAll} />
      </div>
    </div>
  );
}

export default SearchPannel;
