import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getPostDataFailed, getPostDataStart, getPostDataSuccess } from '../slices/postSlice';
import { setIsMiniPlayer, setPlayValue } from '../slices/playerSlice';
import { postDataAPI } from '../../ultis/fetchData';
import { getHistoryListData } from './libraryApi';

export const getPost = async (postId, dispatch, token, navigate) => {
    dispatch(getPostDataStart());
    try {
        const res = await axios.get(`${BASE_URL}/post/${postId}`);
        await axios.put(`${BASE_URL}/post/${postId}/views`);
        dispatch(getPostDataSuccess(res.data));
        if (token !== null) {
            postDataAPI(`history/${postId}/add`, null, token);
        }
        navigate('PlayerScreen');
        dispatch(setIsMiniPlayer(true));
        dispatch(setPlayValue(true))
    } catch (err) {
        dispatch(getPostDataFailed())
        console.log(err.message);
    }
};