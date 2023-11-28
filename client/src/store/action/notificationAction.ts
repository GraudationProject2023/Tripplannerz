const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const addNotification = (message:string) => {
    return {
        type: ADD_NOTIFICATION,
        payload: message,
    }
}

export const removeNotification = (message:string) => {
    return {
        type: REMOVE_NOTIFICATION,
        payload: message,
    }
}