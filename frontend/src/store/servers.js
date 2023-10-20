import csrfFetch from "./csrf";
import { receiveChannels } from "./channels";
import { CLEAR_USERS, receiveUsers } from "./users"
import { receiveMessages } from "./messages";

//ACTION CONSTANTS
export const RECEIVE_SERVERS = 'servers/RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'servers/RECEIVE_SERVER';
export const REMOVE_SERVER = 'servers/REMOVE_SERVER';
export const REMOVE_USER_SERVER = 'servers/REMOVE_USER_SERVER';
export const CLEAR_SERVERS = 'servers/CLEAR_SERVERS'

//SELECTORS
export const getServers = (state) => {
  return state.entities.servers ? state.entities.servers : null;
};

export const getServer = (serverId) => (state) => {
  return state.entities.servers ? state.entities.servers[serverId] : null;
};

//POJO ACTION CREATORS
export const receiveServers = (servers) => ({
  type: RECEIVE_SERVERS,
  servers
});

export const receiveServer = (payload) => ({
  type: RECEIVE_SERVER,
  payload
});

export const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  serverId
});

export const removeUserServer = (serverId) => ({
  type: REMOVE_USER_SERVER,
  serverId
})

export const clearServers = () => ({
  type: CLEAR_SERVERS
})

//THUNK ACTIONS
export const fetchServers = () => async dispatch => {
  const response = await csrfFetch('/api/servers');

  if (response.ok) {
    const servers = await response.json();
    dispatch(receiveServers(servers));
  }

  return response;
};

export const fetchServer = (serverId) => async dispatch => {
  const response = await csrfFetch(`/api/servers/${serverId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveServer(data));
    dispatch(receiveChannels(data));
    dispatch(receiveUsers(data));
    dispatch(receiveMessages(data));
    return data;
  }

  return response;
};

export const createServer = (server) => async dispatch => {
  const response = await csrfFetch(`/api/servers/`, {
    method: 'POST',
    body: JSON.stringify(server),
  });

  if (response.ok) {
    const server = await response.json();
    dispatch(receiveServer(server));
    return server;
  }

  return response;
};

export const updateServer = (server) => async dispatch => {
  const response = await csrfFetch(`/api/servers/${server.id}`, {
    method: 'PATCH',
    body: JSON.stringify(server),
  });

  if (response.ok) {
    const server = await response.json();
    dispatch(receiveServer(server));
  }

  return response;
};

export const deleteServer = (serverId) => async dispatch => {
  const response = await csrfFetch(`/api/servers/${serverId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeServer(serverId));
  }

  return response;
};

export const leaveServer = (serverId) => async dispatch => {
  const response = await csrfFetch(`/api/user_servers/${serverId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeUserServer(serverId));
  }

  return response;
};

// REDUCER
const serversReducer = (state = {}, action) => {
  let nextState = { ...state };

  switch (action.type) {
    case RECEIVE_SERVERS:
      nextState = { ...nextState, ...action.servers };
      return nextState;

    case RECEIVE_SERVER:
      nextState[action.payload.server.id] = action.payload.server;
      return nextState;

    case REMOVE_SERVER:
      delete nextState[action.serverId];
      return nextState;

    case REMOVE_USER_SERVER:
      delete nextState[action.serverId];
      return nextState;

    case CLEAR_USERS:
      nextState = {};
      return nextState;
      
    default:
      return state;
  }
};

export default serversReducer;