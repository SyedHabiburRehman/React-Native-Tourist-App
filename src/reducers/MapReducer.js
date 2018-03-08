import {
    FETCH_LOCATION_SUCCESSFUL,
    FETCH_LOCATION_DETAIL_SUCCESSFUL,
    GET_POLYLINE,
    FETCH_LOCATION_SEARCH_SUCCESSFUL,
    LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
    locationsList: [],
    locationDetail: {},
    coords: [],
    locationSearch: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOCATION_SUCCESSFUL:
            console.log("Hello world")
            return { ...state, locationsList: action.payload }
        case FETCH_LOCATION_DETAIL_SUCCESSFUL:
            // console.log(action.payload)
            return { ...state, locationDetail: action.payload }
        case GET_POLYLINE:
            // console.log(action.payload)
            return { ...state, coords: action.payload }
        case FETCH_LOCATION_SEARCH_SUCCESSFUL:
            // console.log(action.payload)
            return { ...state, locationSearch: action.payload }
        // case LOGOUT:
        // console.log('LOGOUT')
        //     return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};