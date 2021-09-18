import {SUCCESFUL_REGISTRATION, 
        UNSUCCESFUL_REGISTRATION, 
        GET_USER,
        SUCCESFUL_LOGIN,
        UNSUCCESFUL_LOGIN,
        LOG_OUT} from '../../types/';



const AuthReducer = (state, action) => {
    
    switch(action.type){
        case SUCCESFUL_REGISTRATION:
        case SUCCESFUL_LOGIN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                uploading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                uploading: false
            }
        case LOG_OUT:
        case UNSUCCESFUL_LOGIN:
        case UNSUCCESFUL_REGISTRATION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                uploading: false
            }

        default:
            return state;
    }
}
export default AuthReducer;