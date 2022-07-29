import React, { useEffect } from 'react';

function Join() {
  useEffect(() => {
    fetch('http://localhost:3001/join', {
      credentials: 'include',
    })
      .then((res) => (res.json()))
      .then((date) => console.log(date));
  }, []);

  return (
    <div>Join</div>
  );
}

export default Join;
