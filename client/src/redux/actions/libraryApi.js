import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getHistoryListFailed, getHistoryListStart, getHistoryListSuccess, getLikedListFailed, getLikedListStart, getLikedListSuccess, getRecommendFailed, getRecommendStart, getRecommendSuccess, getSavedListFailed, getSavedListStart, getSavedListSuccess } from '../slices/librarySlice';
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

export const getSavedListData = async (dispatch, token) => {
    dispatch(getSavedListStart());
    try {
        const res = await postDataAPI('save', null, token);
        dispatch(getSavedListSuccess(res.data.saved));
    } catch (err) {
        dispatch(getSavedListFailed())
        console.log(err.message);
    }
};

export const getHistoryListData = async (dispatch, token) => {
    dispatch(getHistoryListStart());
    try {
        const res = await postDataAPI('history', null, token);
        dispatch(getHistoryListSuccess(res.data.history));
    } catch (err) {
        dispatch(getHistoryListFailed())
        console.log(err.message);
    }
};