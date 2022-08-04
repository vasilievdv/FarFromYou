export const getAudioAC = (payload) => ({ type: 'GET_AUDIO', payload });
export const getFromserverAC = (payload) => ({ type: 'GET_FROMSERVER', payload });

export const getAudioThunk = (id) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_HOST}/audio/gettracksinfo/${id}`);
  const serverAdress = `${process.env.REACT_APP_HOST}/audio/`;
  const paths = await response.json();
  const concatServer = await paths.map((el) => [serverAdress.concat(el[0]), el[1], el[2]]);
  dispatch(getFromserverAC(concatServer));
};
