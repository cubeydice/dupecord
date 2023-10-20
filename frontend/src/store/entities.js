import { combineReducers } from "redux";
import serversReducer from "./servers";
import channelsReducer from "./channels";
import usersReducer from "./users";
import messagesReducer from "./messages";

export const RECEIVE_ENTITIES = 'entities/RECEIVE_ENTITIES'
export const RECEIVE_ENTITY = 'entities/RECEIVE_ENTITY'
export const CLEAR_STATE = 'CLEAR_STATE'

const entitiesReducer = combineReducers({
  servers: serversReducer,
  channels: channelsReducer,
  users: usersReducer,
  messages: messagesReducer
})

export default entitiesReducer;