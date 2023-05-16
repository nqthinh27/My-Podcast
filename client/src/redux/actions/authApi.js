import axios from 'axios';
import { getAllPostsFailed, getAllPostsStart, getAllPostsSuccess, getFollowersFailed, getFollowersStart, getFollowersSuccess, getFollowingFailed, getFollowingStart, getFollowingSuccess, getNotifiesFailed, getNotifiesStart, getNotifiesSuccess, getTopPostsFailed, getTopPostsStart, getTopPostsSuccess, loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess, setUserAccessToken, updateStart, updateUser } from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { BASE_URL } from '../../ultis/config';
import { setAccessToken, setRefreshToken } from '../../ultis/auth';
import { loginAccount } from '../slices/loginSlice';
import jwtDecode from 'jwt-decode';
import { postDataAPI } from '../../ultis/fetchData';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess(res.data));
        dispatch(loginAccount());
        await setAccessToken(res.data.access_token);
        await setRefreshToken(res.data.refresh_token);
        return true;
    } catch (err) {
        dispatch(loginFailed());
        return false;
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
        const res = await axios.post(`${BASE_URL}/auth`, null, {
            headers: { 
                token: rf_token.data.access_token,
            }
        });
        dispatch(loginSuccess(res.data));
        dispatch(loginAccount());
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

export const getMyUserAllPosts = async (userId, dispatch) => {
    dispatch(getAllPostsStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/${userId}/posts?page=1&limit=15`);
        dispatch(getAllPostsSuccess(res.data.posts));
    } catch (err) {
        dispatch(getAllPostsFailed());
        alert('User không tồn tại!');
    }
}

export const getMyUserTopPosts = async (userId, dispatch) => {
    dispatch(getTopPostsStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/${userId}/topPosts`);
        dispatch(getTopPostsSuccess(res.data.posts));
    } catch (err) {
        dispatch(getTopPostsFailed());
        alert('User không tồn tại!');
    }
}

export const getMyFollowers = async (userId, dispatch) => {
    dispatch(getFollowersStart());
    try {
        const res = await axios.get(`${BASE_URL}/follow/${userId}/followers`);
        dispatch(getFollowersSuccess(res.data.follower));
    } catch (err) {
        dispatch(getFollowersFailed());
        alert('User không tồn tại!');
    }
}

export const getMyFollowing = async (userId, dispatch) => {
    dispatch(getFollowingStart());
    try {
        const res = await axios.get(`${BASE_URL}/follow/${userId}/following`);
        dispatch(getFollowingSuccess(res.data.following));
    } catch (err) {
        dispatch(getFollowingFailed());
        alert('User không tồn tại!');
    }
}

export const updateMyProfile = (newUser, dispatch) => {
    dispatch(updateUser(newUser));
}

export const getNotifies = async (access_token, dispatch) => {
    dispatch(getNotifiesStart());
    try {
        const res = await postDataAPI(`notify/get`,null, access_token);
        dispatch(getNotifiesSuccess(res.data.notifies));
        console.log(res.data.notifies);
    } catch (err) {
        dispatch(getNotifiesFailed());
        console.log('Lấy dữ liệu thông báo thất bại!');
    }
}