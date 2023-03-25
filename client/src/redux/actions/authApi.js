import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess } from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        await AsyncStorage.setItem('access_token', res.data.access_token);
        await AsyncStorage.setItem('refresh_token', res.data.refresh_token);
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
        await AsyncStorage.setItem('access_token', 'Không có accc');
        await AsyncStorage.setItem('refresh_token', 'Không có rfr');
        navigate('Home');
    } catch (err) {
        dispatch(loginFailed);
        alert('Đã xảy ra lỗi. Vui lòng thử lại!')
    }
}

// AsyncStorage.getItem('access_token').then((value) => {
//     console.log(value);
// });