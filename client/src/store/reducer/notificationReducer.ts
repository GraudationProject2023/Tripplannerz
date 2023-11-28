const initialState = {
    notifications: [],
};

export const notificationReducer = (state = initialState, action:any) => {
    switch(action.type){
        case 'ADD_NOTIFICATION':
        return {
            ...state,
            notifications:[ ...state.notifications, action.payload ],
        };

        case 'REMOVE_NOTIFICATION':
        return {
            ...state,
            notifications: state.notifications.filter(notification => notification !== action.payload),
        };

        default: 
        return state;
    }
};