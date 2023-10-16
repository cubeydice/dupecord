import csrfFetch from "./csrf";

//ACTION CONSTANTS
export const RECEIVE_SERVERS = 'servers/RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'servers/RECEIVE_SERVER';
export const REMOVE_SERVER = 'servers/REMOVE_SERVER';

//USE SELECTORS
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

export const receiveServer = (server) => ({
  type: RECEIVE_SERVER,
  server
});

export const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  serverId
});

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
    const server = await response.json();
    dispatch(receiveServer(server));
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
    method: 'PATCH'
  });

  if (response.ok) {
    dispatch(removeServer(serverId));
  }

  return response;
};

//REDUCER
const serversReducer = (state = {}, action) => {
  let nextState = { ...state };

  switch (action.type) {
    case RECEIVE_SERVERS:
      nextState = { ...nextState, ...action.servers };
      return nextState;

    case RECEIVE_SERVER:
      nextState[action.server.id] = action.server;
      return nextState;

    case REMOVE_SERVER:
      delete nextState[action.serverId];
      return nextState;

    default:
      return state;
  }
};

export default serversReducer;