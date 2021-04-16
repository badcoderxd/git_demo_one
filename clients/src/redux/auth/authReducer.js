import {
 LOGIN_USER,
 LOGOUT_USER,
 LOGIN_USER_SUCCESS,
 LOGIN_USER_FAILED
} from './types';

const INIT_STATE ={
      loading:false
}

const Auth = (state = INIT_STATE,action) =>{
    switch(action.type){
        case LOGIN_USER:
            return {...state, loading:true};
        case LOGIN_USER_SUCCESS:
            return {...state, user:action.payload, loading:false};
        case LOGIN_USER_FAILED:
                return { ...state, error: action.payload, loading: false };
        case LOGOUT_USER:
            return {...state, user:null };
        default:
            return {...state};
    }
}

export default Auth;