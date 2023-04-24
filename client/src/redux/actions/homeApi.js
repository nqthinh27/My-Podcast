import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getNewReleaseFailed, getNewReleaseStart, getNewReleaseSuccess, getSliderFailed, getSliderStart, getSliderSuccess, getTopAuthorFailed, getTopAuthorStart, getTopAuthorSuccess, getTopTrendingFailed, getTopTrendingStart, getTopTrendingSuccess } from '../slices/homeSlice';

export const fetchSlider = async (dispatch) => {
    dispatch(getSliderStart());
    try {
        const res = await axios.get(`${BASE_URL}/home/slider`);
        dispatch(getSliderSuccess({ items: res.data }));
    } catch (err) {
        dispatch(getSliderFailed())
        console.log(err.message);
    }
};

export const fetchTopTrending = async (dispatch) => {
    dispatch(getTopTrendingStart());
    try {
        const res = await axios.get(`${BASE_URL}/home/topTrending`);
        dispatch(getTopTrendingSuccess({ items: res.data }));
    } catch (err) {
        dispatch(getTopTrendingFailed())
        console.log(err.message);
    }
};

export const fetchNewRelease = async (dispatch) => {
    dispatch(getNewReleaseStart());
    try {
        const res = await axios.get(`${BASE_URL}/home/newRelease`);
        dispatch(getNewReleaseSuccess({ items: res.data }));
    } catch (err) {
        dispatch(getNewReleaseFailed());
        console.log(err.message);
    }
};


export const fetchTopAuthor = async (dispatch) => {
    dispatch(getTopAuthorStart());
    try {
        const res = await axios.get(`${BASE_URL}/home/topAuthor`);
        dispatch(getTopAuthorSuccess({ items: res.data }));
    } catch (err) {
        dispatch(getTopAuthorFailed());
        console.log(err.message);
    }
};

