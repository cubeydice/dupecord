import { combineReducers } from "redux";
import csrfFetch from "./csrf";
import serversReducer, { RECEIVE_SERVERS, RECEIVE_SERVER, REMOVE_SERVER } from "./servers";
import channelsReducer from "./channels";

export const RECEIVE_ENTITIES = 'entities/RECEIVE_ENTITIES'
export const RECEIVE_ENTITY = 'entities/RECEIVE_ENTITY'

//import server and other entity POJO actions to this folder
//combine in thunk actions

export const getEntities = (state) => {
  return state.entities ? state.entities : [];
};

export const receiveEntities = (entities) => ({
  type: RECEIVE_ENTITIES,
  entities
})

//THUNK ACTIONS - SESSION STORAGE
//to-do: set and store entities in session storage
export const fetchEntities = (userId) => async dispatch => {
  const res = await csrfFetch(`api/users/${userId}`)

  if (res.ok) {
    const entities = res.json();
    dispatch(receiveEntities(entities))
  }
}


//REDUCER
// const entitiesReducer = (state = {}, action) => {
//   let nextState = { ...state };

//   switch (action.type) {
//     // case RECEIVE_ENTITIES:
//     //   nextState = { ...nextState, ...action.entities}
//     //   return nextState;

//     case RECEIVE_SERVERS:
//       nextState = { ...nextState, ...action.servers };
//       return nextState;

//     case RECEIVE_SERVER:
//       // debugger
//       nextState[action.payload.server.id] = action.payload.server;
//       return nextState;

//     case REMOVE_SERVER:
//       delete nextState[action.serverId];
//       return nextState;

//     default:
//       return state;
//   }
// };

const entitiesReducer = combineReducers({
  servers: serversReducer,
  channels: channelsReducer
})

export default entitiesReducer;