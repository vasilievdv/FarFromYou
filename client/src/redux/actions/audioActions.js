export const getAudioAC = (payload) => ({ type: 'GET_AUDIO', payload });
export const getFromserverAC = (payload) => ({ type: 'GET_FROMSERVER', payload });

export const getAudioThunk = () => async (dispatch) => {
  const response = await fetch('http://localhost:3001/api/getAudio', {
    method: 'get',
  });
  const serverAdress = 'http://localhost:3001/audio/';
  const paths = await response.json();
  const concatServer = await paths.map((el) => serverAdress.concat(el));
  dispatch(getFromserverAC(concatServer));
};
