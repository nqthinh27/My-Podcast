import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getPostDataFailed, getPostDataStart, getPostDataSuccess } from '../slices/postSlice';
import { setIsMiniPlayer, setPlayValue } from '../slices/playerSlice';

export const getPost = async (postId, dispatch) => {
    dispatch(getPostDataStart());
    try {
        const res = await axios.get(`${BASE_URL}/post/${postId}`);
        dispatch(getPostDataSuccess(res.data));
        // dispatch(setIsMiniPlayer(false));
        // navigate('PlayerScreen');
        dispatch(setPlayValue(true))
    } catch (err) {
        dispatch(getPostDataFailed())
        console.log(err.message);
    }
};