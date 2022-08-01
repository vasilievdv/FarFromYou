// import React, { useEffect, useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import './Multer.css';
// import axios from 'axios';

// import { getAudioAC } from '../../redux/actions/audioActions';

// function Multer() {
//   const dispatch = useDispatch();
//   const [audio, setAudio] = useState(null);
//   const [author, setAuthor] = useState('');
//   const [title, setTitle] = useState('');

//   const inputFiles = { audio, author, title };

//   const sendFile = useCallback(async () => {
//     try {
//       // const data = new FormData();
//       // data.append('audiofile', audio);

//       await axios.post('/api/upload', inputFiles, {
//         headers: {
//           'content-type': 'multipart/form-data',
//         },
//       })
//         // .then((res) => setPlay(res.data.path));
//         .then((res) => dispatch(getAudioAC(res.data.path)));
//     } catch (error) {
//       console.log(error);
//     }
//   }, [inputFiles]);
//   const handleAuthorChange = (e) => {
//     setAuthor(e.target.value);
//   };
//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   return (

//     <div className="hero-content flex-col lg:flex-row-reverse">
//       <div className="text-center lg:text-left" />
//       <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//         <div className="card-body multer-card">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Автор</span>
//             </label>
//             <input
//               onChange={handleAuthorChange}
//               type="text"
//               className="input input-bordered"
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Название трека</span>
//             </label>
//             <input
//               onChange={handleTitleChange}
//               type="text"
//               className="input input-bordered"
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Название трека</span>
//             </label>
//             <input
//               onChange={handleTitleChange}
//               type="file"
//               className="input input-bordered"
//             />
//           </div>
//           {/* <div>
//             <input
//               type="file"
//               onChange={(e) => setAudio(e.target.files[0])}
//             />
//           </div> */}
//           <div className="form-control mt-6">
//             <button
//               onClick={sendFile}
//               type="submit"
//               className="btn btn-primary"
//             >
//               Добавить трек
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// }

// export default Multer;
