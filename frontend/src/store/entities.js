import { combineReducers } from "redux";
import csrfFetch from "./csrf";
import serversReducer from "./servers";
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

const entitiesReducer = combineReducers({
  servers: serversReducer,
  channels: channelsReducer
})

export default entitiesReducer;