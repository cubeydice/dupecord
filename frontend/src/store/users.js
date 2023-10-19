import csrfFetch from "./csrf";

//ACTION CONSTANTS
export const RECEIVE_USERS = 'user/RECEIVE_USER'
export const RECEIVE_USER = 'user/RECEIVE_USER'
export const REMOVE_USER = 'user/REMOVE_USER'

//SELECTORS
export const getUsers = (state) => {
  return state.entities.users ? state.entities.users : null;
};

export const getUser = (userId) => (state) => {
  return state.entities.users ? state.entities.users[userId] : null;
};

//POJO ACTION CREATORS
export const receiveUsers = (payload) => ({
  type: RECEIVE_USERS,
  payload
});

export const receiveUser = (payload) => ({
  type: RECEIVE_USER,
  payload
});

export const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId
});

//THUNK ACTIONS
export const fetchUsers = () => async dispatch => {
  const response = await csrfFetch(`/api/users`)

  if (response.ok) {
    const users = await response.json();
    dispatch(receiveUser(users));
    return users;
  }

  return response;
}

export const fetchUser = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}`)

  if (response.ok) {
    const user = await response.json();
    dispatch(receiveUser(user));
    return user;
  }

  return response;
}

export const updateUser = (user) => async dispatch => {
  const response = await csrfFetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify(user)
  })

  if (response.ok) {
    const user = await response.json();
    dispatch(receiveUser(user));
    return user;
  }

  return response;
}

export const deleteUser = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeUser(userId));
  }

  return response;
}

//REDUCER

const usersReducer = (state = {}, action) => {
  let nextState = { ...state };

  switch (action.type) {
    case RECEIVE_USERS:
      return { ...action.payload.users};
    case RECEIVE_USER:
      nextState[action.payload.user.id] = action.payload.user;
      return nextState;
    case REMOVE_USER:
      delete nextState[action.userId]
      return nextState
    default:
      break;
  }
}

export default usersReducer;