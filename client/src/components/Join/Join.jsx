import React, { useEffect } from 'react';
import Chat from '../Chat/Chat';

function Join() {
  useEffect(() => {
    fetch('http://localhost:3001/join', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => console.log(date));
  }, []);

  return (
    <div><Chat /></div>
  );
}

export default Join;
