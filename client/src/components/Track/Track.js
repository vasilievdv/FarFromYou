import React from 'react'
import audio from './audio/Nirvana.mp3';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function Track() {

  const sendAudio = () => {
    socket.emit('send_message', {message: "hello"})
    console.log("done");
  }

  return (
    <>
     <audio controls>
        <source src={audio} type="audio/ogg; codecs=vorbis"/>
        <source src={audio}  type="audio/mpeg"/>
    Тег audio не поддерживается вашим браузером. 
        <a href="audio/music.mp3">Скачайте музыку</a>.
    </audio>
    <input></input>
    <button onClick={sendAudio}>ddd </button>
    </>
   
  )
}

export default Track