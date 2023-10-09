import csrfFetch from './csrf';

//action constants
export const SET_CURRENT_USER = 'session/setCurrentUser';
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

//POJO action creators
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

//aync actions
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });

  const data = await response.json();

  dispatch(setCurrentUser(data.user));

  return response;
};

//reducer
const sessionReducer = (state = { user: null }, action) => {
  const nextState = {...state}

  switch (action.type) {
    case SET_CURRENT_USER:
      nextState.user = action.user;
      return nextState;
    case REMOVE_CURRENT_USER:
      nextState.user = null;
      return nextState;
    default:
      return state;
  }
}

export default sessionReducer;