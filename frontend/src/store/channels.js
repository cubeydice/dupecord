import csrfFetch from "./csrf"
//ACTION CONSTANTS
const RECEIVE_CHANNELS = 'channels/RECEIVE_CHANNELS'
const RECEIVE_CHANNEL = 'channels/RECEIVE_CHANNEL'
const REMOVE_CHANNEL = 'channels/REMOVE_CHANNEL'

//SELECTORS
export const getChannels = (state) => {
  return state.entities.channels ? state.entities.channels : null;
}

export const getChannel = (channelId) => (state) => {
  return state.entities.channels ? state.entities.channels[channelId] : null;
}

//POJO ACTION CREATORS
export const receiveChannels = (payload) => ({
  type: RECEIVE_CHANNELS,
  payload
})

export const receiveChannel = payload => {
  return {
      type: RECEIVE_CHANNEL,
      payload
  }
}

export const removeChannel = (channelId, serverId) => {
  return {
      type: REMOVE_CHANNEL,
      channelId,
      serverId
  }
}

//THUNK ACTIONS
export const createChannel = (channel) => async dispatch => {
    let res = await csrfFetch(`/api/channels`, {
        method: "POST",
        body: JSON.stringify({channel})
    });

    if (res.ok) {
        let data = await res.json();
        return data
    }
}

export const updateChannel = (channel) => async dispatch => {
  let res = await csrfFetch(`/api/channels/${channel.id}`, {
      method: "PATCH",
      body: JSON.stringify({channel})
  })

  if (res.ok) {
    let data = await res.json();
    dispatch(receiveChannel(data))
    return data
  }
}

export const deleteChannel = (channelId) => async dispatch => {
    let res = await csrfFetch(`/api/channels/${channelId}`, {
        method: "DELETE"
    })

    if (res.ok) {
      dispatch(removeChannel(channelId))
    }
}

//REDUCER
const channelsReducer = (state = {}, action) => {
  let nextState = {...state}
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return {...action.payload.channels};

    case RECEIVE_CHANNEL:
        nextState[action.payload.channel.id] = action.payload.channel;
        return nextState;

    case REMOVE_CHANNEL:
        delete nextState[action.channelId];
        return nextState;

    default:
        return state;
  }
}

export default channelsReducer;