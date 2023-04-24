import axios from 'axios';
import { BASE_URL } from '../../ultis/config';
import { getRecommendFailed, getRecommendStart, getRecommendSuccess } from '../slices/librarySlice';

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