import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    HIDE_ALERT,
    AUTH_FAILURE,
    AUTH_SUCCESS,
    AUTH_USER,
    SIGN_OUT,
    CLEAN_STATE
} from '../../types';


const authReducer = (state, action) => {
    switch(action.type) {
        case SIGNUP_SUCCESS: 
        case SIGNUP_FAILURE:
        case AUTH_FAILURE:
            return {
                ...state, 
                message: action.payload
            }
        case AUTH_SUCCESS:
            localStorage.setItem('NS_token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case AUTH_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case SIGN_OUT:
            localStorage.removeItem('NS_token');
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null
            }
        case HIDE_ALERT:
            return {
                ...state,
                message: null
            } 
        case CLEAN_STATE:
            return {
                ...state,
                message_file: null,
                name: '',
                origin_name: '',
                loading: false,
                downloads: 1,
                password: '',
                author: null,
                url: ''
            }
        default:
            return state;
    }
};

export default authReducer;