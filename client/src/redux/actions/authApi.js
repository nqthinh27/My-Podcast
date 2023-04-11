import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess, setUserAccessToken } from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { BASE_URL } from '../../ultis/config';
import { setAccessToken, setRefreshToken } from '../../ultis/auth';
import { loginAccount } from '../slices/loginSlice';
import jwtDecode from 'jwt-decode';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data));
        dispatch(loginAccount());
        await setAccessToken(res.data.access_token);
        await setRefreshToken(res.data.refresh_token);
        navigate('UIScreen');
    } catch (err) {
        dispatch(loginFailed());
        alert('Email hoặc password không đúng. Vui lòng thử lại!')
    }
}

export const stayLogged = async (refresh_token, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        // Lấy access token mới
        const rf_token = await axios.post(`${BASE_URL}/auth/rf_token`, null, {
            headers: {
                token: refresh_token,
            }
        });
        // Lưu accessToken mới vào storage và redux
        await setAccessToken(rf_token.data.access_token);
        dispatch(setUserAccessToken(rf_token.data.access_token))
        // giải mã token 
        decodedToken = jwtDecode(rf_token.data.access_token);
        // Lấy data người dùng
        const res = await axios.get(`${BASE_URL}/user/${decodedToken.id}`);
        dispatch(loginSuccess(res.data));
        navigate('UIScreen');
    } catch (err) {
        dispatch(loginFailed());
        console.log('Error: ', err.message);
    }
}

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
        dispatch(loginAccount());
        await setAccessToken('');
        await setRefreshToken('');
        navigate('Home');
    } catch (err) {
        dispatch(loginFailed);
        alert('Đã xảy ra lỗi. Vui lòng thử lại!')
    }
}

export const refreshToken = async (dispatch) => {
    const [firstLogin, setFirstLogin] = useState('');
    AsyncStorage.getItem('firstLogin').then((value) => {
        setFirstLogin(value);
    });

}

// AsyncStorage.getItem('access_token').then((value) => {
//     console.log(value);
// });