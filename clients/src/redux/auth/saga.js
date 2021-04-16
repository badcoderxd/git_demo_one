import { Cookies } from 'react-cookie';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_USER,
    LOGOUT_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED
   } from './types';
import { BASE_LOCAL_URL } from '../../constants/urlconstants';
import { postJSON } from '../../helpers/api';

const setSession = user =>{
    let cookies = new Cookies();
    if(user)
    {
         cookies.set('user', JSON.stringify(user),{path:'/', sameSite: 'Lax'});
         console.log(user)    
    }
    else 
    {
        cookies.remove('user', { path: '/' });
    }
}

function* login({payload:{email,password}}){

    const options = { email, password };
    
    const response = yield call(postJSON, '/signin', options);
    setSession(response); 
}

function* logout(){
    
}


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}

export default authSaga;