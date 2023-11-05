const notificationsCountReducer = (state = 0, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATIONS_COUNT':
        return action.payload;
      default:
        return state;
    }
  };
  
  const tokenReducer = (state = "undefined", action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return action.payload;
      default:
        return state;
    }
  };

  const initialState = {
    messages: [],
  }
  
  const eventSourceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EVENT_SOURCE':
        return {
          ...state,
          messages: [...state.messages, action.payload]
        }
      default:
        return state;
    }
  };
  
  const commentReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_COMMENT':
        return action.payload;
      default:
        return state;
    }
  };
  
  export {
    notificationsCountReducer,
    tokenReducer,
    eventSourceReducer,
    commentReducer,
  };
  