import csrfFetch from "./csrf";

//ACTION CONSTANTS
export const RECEIVE_MESSAGES = 'messages/RECEIVE_MESSAGES'
export const RECEIVE_MESSAGE = 'messages/RECEIVE_MESSAGE'
export const REMOVE_MESSAGE = 'messages/REMOVE_MESSAGE'

//SELECTORS
export const getMessages = state => {
  return state.entities.messages ? state.entities.messages : null;
}

export const getMessage = messageId => state => {
  return state.entities.messages ? state.entities.messages[messageId] : null;
}

//POJO ACTION CREATORS
export const receiveMessages = (payload) => ({
  type: RECEIVE_MESSAGES,
  payload
})

export const receiveMessage = (payload) => ({
  type: RECEIVE_MESSAGE,
  payload
})

export const removeMessage = (messageId) => ({
  type: REMOVE_MESSAGE,
  messageId
})

//THUNK ACTIONS
export const fetchMessages = () => async dispatch => {
  const response = await csrfFetch(`/api/messages}`)

  if (response.ok) {
    const messages = await response.json();
    dispatch(receiveMessages(messages));
    return messages;
  }

  return response;
}

export const fetchMessage = (messageId) => async dispatch => {
  const response = await csrfFetch(`/api/messages/${messageId}}`)

  if (response.ok) {
    const message = await response.json();
    dispatch(receiveMessages(message));
    return message;
  }

  return response;
}

export const createMessage = (message) => async dispatch => {
  const response = await csrfFetch(`/api/messages`, {
    method: 'POST',
    body: JSON.stringify(message)
  })

  if (response.ok) {
    const message = await response.json();
    dispatch(receiveMessage(message));
    return message;
  }

  return response;
}

export const updateMessage = (message) => async dispatch => {
  const response = await csrfFetch(`/api/messages/${message.id}}`, {
    method: 'PATCH',
    body: JSON.stringify(message)
  })

  if (response.ok) {
    const message = await response.json();
    dispatch(receiveMessage(message));
    return message;
  }

  return response;
}

//REDUCER
const messagesReducer = (state = {}, action) => {
  let nextState = { ...state };

  switch (action.type) {
    case RECEIVE_MESSAGES:
      return { ...action.payload.messages}
    case RECEIVE_MESSAGE:
      if (!action.payload.message) {
        nextState[action.payload.id] = action.payload
      } else {
        nextState[action.payload.message.id] = action.payload.message;
      }
      return nextState;
    case REMOVE_MESSAGE:
      delete nextState[action.messageId]
      return nextState
    default:
      return state;
  }
}

export default messagesReducer;