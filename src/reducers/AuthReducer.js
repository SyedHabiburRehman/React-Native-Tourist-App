import {
    USER_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT
} from '../actions/types';



const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    loading: false,
    error: '',
    user: null,
    isRegistered: false,
    isLoggedin: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };

        case SIGNUP_USER:
            return { ...state, loading: true, error: '' };
        case SIGNUP_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, isRegistered: true, user: action.payload };
        case SIGNUP_USER_FAIL:
            return { ...state, error: 'User Already Exist', email: '', password: '', loading: false };

        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, isLoggedin: true, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed', password: '', loading: false };

        case LOGOUT:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
