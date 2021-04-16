import {  LOGIN_USER,
          LOGIN_USER_FAILED,
          LOGIN_USER_SUCCESS,
          LOGOUT_USER        
        } from './types';

export const loginUser = (email, password) =>({
    type:LOGIN_USER,
    payload:{email, password},
})

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const loginUserFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history },
});