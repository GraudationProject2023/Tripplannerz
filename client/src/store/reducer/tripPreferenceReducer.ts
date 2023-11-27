const initialState = {
    types: [],
};

export const tripPreferenceReducer = (state = initialState, action: any) => {
    switch(action.type){
        case 'ADD_TAG':
            return {
                ...state,
                types: [...state.types, action.payload],
            }
        default:
            return state;
    }
}