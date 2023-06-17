import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getCommentDataFailed, getCommentDataStart, getCommentDataSuccess, getCommentFailed, getCommentStart, getCommentSuccess, setIsCommentPosted } from '../slices/commentSlice';

export const getCommentData = async (postId, dispatch) => {
    dispatch(getCommentDataStart());
    try {
        const res = await axios.get(`${BASE_URL}/comment/${postId}`);
        dispatch(getCommentDataSuccess(res.data.comment));
        dispatch(setIsCommentPosted(false));
    } catch (err) {
        dispatch(getCommentDataFailed())
        console.log(err.message);
    }
};

export const createComment = async (postId, commentText, dispatch, token) => {
    dispatch(getCommentStart());
    try {
        const res = await axios.post(`${BASE_URL}/comment/${postId}/create`, { content: commentText }, {
            headers: { token: token }
        });
        dispatch(getCommentSuccess(''));
        dispatch(setIsCommentPosted(true));
        return res;
    } catch (err) {
        dispatch(getCommentFailed())
        console.log(err.message);
    }
};

