import { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from "./servers";

//import server and other entity POJO actions to this folder
//combine in thunk actions

export const getEntities = (state) => {
  return state.entities ? Object.values(state.entities) : [];
};

export const getServers = (state) => {
  return state.entities.servers ? Object.values(state.entities.servers) : [];
};

//THUNK ACTIONS - SESSION STORAGE
//set and store entities in session storage

//REDUCER
const entitiesReducer = (state = {}, action) => {
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

export default entitiesReducer;