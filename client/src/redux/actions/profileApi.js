import axios from 'axios';
import { useState } from "react";
import { BASE_URL } from '../../ultis/config';
import { getOtherUserFailed, getOtherUserStart, getOtherUserSuccess } from '../slices/profileSlice';


export const getOtherUser = async (userId, dispatch, navigate) => {
    dispatch(getOtherUserStart());
    try {
        const res = await axios.get(`${BASE_URL}/user/${userId}`);
        dispatch(getOtherUserSuccess(res.data));
        navigate('OtherProfile');
    } catch (err) {
        dispatch(getOtherUserFailed());
        alert('User không tồn tại!');
    }
}