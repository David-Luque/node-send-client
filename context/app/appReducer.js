import {
    SHOW_ALERT,
    HIDE_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_FAILURE,
    ADD_PASSWORD,
    EDIT_DOWNLOADS
} from '../../types';


const appReducer = (state, action)=>{
    switch(action.type) {
        case SHOW_ALERT:
        case UPLOAD_FILE_FAILURE:
            return {
                ...state,
                message_file: action.payload,
                loading: false
            }
        case HIDE_ALERT:
            return {
                ...state,
                message_file: null
            }
        case UPLOAD_FILE:
            return {
                ...state,
                loading: true
            }
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                origin_name: action.payload.origin_name,
                loading: false
            }
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload
            }
        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case EDIT_DOWNLOADS:
            return {
                ...state,
                downloads: action.payload
            }
        default:
            return state;
    }
};

export default appReducer;