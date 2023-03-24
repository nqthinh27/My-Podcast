import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess } from '../slices/authSlice';

export const BASE_URL = 'http://192.168.42.104:3001';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        // axios.post(`${BASE_URL}/auth/login`, user)
        //     .then(res => {
        //         dispatch(loginSuccess(res.data));
        //     })
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate('UIScreen');
    } catch (err) {
        dispatch(loginFailed());
        alert('Email hoặc password không đúng. Vui lòng thử lại!')
    }
}

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
        navigate('Home');
    } catch (err) {
        dispatch(loginFailed);
        alert('Đã xảy ra lỗi. Vui lòng thử lại!')
    }
}