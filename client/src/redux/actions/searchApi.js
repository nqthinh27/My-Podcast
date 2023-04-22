import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { searchPostsFailed, searchPostsStart, searchPostsSuccess, searchUsersFailed, searchUsersStart, searchUsersSuccess } from '../slices/searchSlice';

export const searchUsers = async (keyword, dispatch) => {
    dispatch(searchUsersStart());
    try {
        const res = await axios.post(`${BASE_URL}/search/user`, keyword);
        dispatch(searchUsersSuccess(res.data));
    } catch (err) {
        dispatch(searchUsersFailed());
    }
}

export const searchPosts = async (keyword, dispatch) => {
    dispatch(searchPostsStart());
    try {
        const res = await axios.post(`${BASE_URL}/search/post`, keyword);
        dispatch(searchPostsSuccess(res.data));
    } catch (err) {
        dispatch(searchPostsFailed());
    }
}