const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token: string | null) => ({
    type: SET_TOKEN,
    payload: token,
})