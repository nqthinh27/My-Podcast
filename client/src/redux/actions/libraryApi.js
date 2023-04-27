import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getLikedListFailed, getLikedListStart, getLikedListSuccess, getRecommendFailed, getRecommendStart, getRecommendSuccess } from '../slices/librarySlice';
import { postDataAPI } from '../../ultis/fetchData';

export const getRecommendData = async (dispatch) => {
    dispatch(getRecommendStart());
    try {
        const res = await axios.get(`${BASE_URL}/home/recommend`);
        dispatch(getRecommendSuccess(res.data));
    } catch (err) {
        dispatch(getRecommendFailed())
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