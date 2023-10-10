import csrfFetch from './csrf';

//action constants
export const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
export const SET_DEMO_USER = 'session/SET_DEMO_USER';
export const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER';

//POJO action creators
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export const setDemoUser = (user) => {
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

//thunk actions
const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user))
  else sessionStorage.removeItem("currentUser");
}

export const login = ({ credential, password }) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setCurrentUser(data.user));
  }

  return response;
};

export const loginDemo = () => async (dispatch) => {
  const response = await csrfFetch('/api/test', {
    method: 'POST',
    body: JSON.stringify({})
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Data",data)
    dispatch(setDemoUser(data.user));
  }

  return response;
};

export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");

  storeCSRFToken(response);

  if (response.ok) {
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
  }

  return response;
};


//reducer
const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  const nextState = {...state}

  switch (action.type) {
    case SET_CURRENT_USER:
      nextState.user = action.user;
      return nextState;
    case SET_DEMO_USER:
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