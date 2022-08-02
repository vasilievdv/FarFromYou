export const getAudioAC = (payload) => ({ type: 'GET_AUDIO', payload });
export const getFromserverAC = (payload) => ({ type: 'GET_FROMSERVER', payload });

export const getAudioThunk = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_HOST}/api/getAudio`, {
    method: 'get',
  });
  const serverAdress = `${process.env.REACT_APP_HOST}/audio/`;
  const paths = await response.json();
  const concatServer = await paths.map((el) => serverAdress.concat(el));
  dispatch(getFromserverAC(concatServer));
};
