/* eslint-disable default-param-last */
const audioReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_AUDIO':
      return [...state, payload];
    case 'GET_FROMSERVER':
      return payload;
    default:
      return state;
  }
};

export default audioReducer;
