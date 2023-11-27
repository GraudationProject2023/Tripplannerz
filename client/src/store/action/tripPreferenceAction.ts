const ADD_TAG = 'ADD_TAG';

export const setTripPreference = (preferenceName) => ({
    type: ADD_TAG,
    payload: preferenceName,
})