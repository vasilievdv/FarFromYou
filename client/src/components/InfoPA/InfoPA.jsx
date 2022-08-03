import React, { useEffect, useState } from 'react';

function InfoPA() {
  const fetchInfo = async () => {
    // console.log('id', id);
    const [info, setInfo] = useState([]);
    const response = await fetch(`${process.env.REACT_APP_HOST}/user/PA`, {
      credentials: 'include',
    });
    console.log('tut');
    const result = await response.json();
    console.log(result);

    useEffect(() => {
      fetchInfo();
    }, []);
  };

  return (
    <div>InfoPA</div>
  );
}
export default InfoPA;
