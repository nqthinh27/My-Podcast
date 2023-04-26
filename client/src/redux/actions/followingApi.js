import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getLikedListFailed, getLikedListStart, getLikedListSuccess, getNewFeedFailed, getNewFeedStart, getNewFeedSuccess } from '../slices/followingSlice';
import { postDataAPI } from '../../ultis/fetchData';

export const getNewFeed = async (dispatch, access_token) => {
    dispatch(getNewFeedStart());
    try {
        const res = await axios.post(`${BASE_URL}/following/newfeed`, null, {
            headers: {
                token: access_token,
            }
        });
        dispatch(getNewFeedSuccess({ items: res.data }));
    } catch (err) {
        dispatch(getNewFeedFailed())
        console.log(err.message);
    }
};

export const getLikedListData = async (dispatch, token) => {
    dispatch(getLikedListStart());
    try {
        const res = await postDataAPI('like', null, token);
        dispatch(getLikedListSuccess(res.data.liked));
    } catch (err) {
        dispatch(getLikedListFailed())
        console.log(err.message);
    }
};