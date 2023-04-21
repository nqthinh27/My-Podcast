import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import {
    getOtherUserStart,
    getOtherUserSuccess,
    getOtherUserFailed,
    getAllPostsStart,
    getAllPostsSuccess,
    getAllPostsFailed,
    getTopPostsStart,
    getTopPostsSuccess,
    getTopPostsFailed,
    getFollowersStart,
    getFollowersSuccess,
    getFollowersFailed,
    getFollowingStart,
    getFollowingSuccess,
    getFollowingFailed,
} from '../slices/profileSlice';
import { useSelector, useDispatch } from "react-redux";

export const getOtherUser = async (userId, dispatch, navigate, user) => {
    dispatch(getOtherUserStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/${userId}`);
        if (user && user._id === res.data._id) navigate('MyProfile');
        else {
            dispatch(getOtherUserSuccess(res.data));
            await getOtherUserAllPosts(userId, dispatch);
            await getOtherUserTopPosts(userId, dispatch);
            await getOtherFollowers(userId, dispatch)
            await getOtherFollowing(userId, dispatch)
    // const following = getPublicDataAPI(`follow/${otherUser._id}/following`).data.following;
            await 
            navigate('OtherProfile');
        }
    } catch (err) {
        dispatch(getOtherUserFailed());
        alert('User không tồn tại!');
    }
}

export const getOtherUserAllPosts = async (userId, dispatch) => {
    dispatch(getAllPostsStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/${userId}/posts?page=1&limit=15`);
        dispatch(getAllPostsSuccess(res.data.posts));
    } catch (err) {
        dispatch(getAllPostsFailed());
        alert('User không tồn tại!');
    }
}

export const getOtherUserTopPosts = async (userId, dispatch) => {
    dispatch(getTopPostsStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/${userId}/topPosts`);
        dispatch(getTopPostsSuccess(res.data.posts));
    } catch (err) {
        dispatch(getTopPostsFailed());
        alert('User không tồn tại!');
    }
}

export const getOtherFollowers = async (userId, dispatch) => {
    dispatch(getFollowersStart());
    try {
        const res = await axios.get(`${BASE_URL}/follow/${userId}/followers`);
        dispatch(getFollowersSuccess(res.data.follower));
    } catch (err) {
        dispatch(getFollowingFailed());
        alert('User không tồn tại!');
    }
}

export const getOtherFollowing = async (userId, dispatch) => {
    dispatch(getFollowingStart());
    try {
        const res = await axios.get(`${BASE_URL}/follow/${userId}/following`);
        dispatch(getFollowingSuccess(res.data.following));
    } catch (err) {
        dispatch(getFollowingFailed());
        alert('User không tồn tại!');
    }
}