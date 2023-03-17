import axios from 'axios';
import { loginStart, loginSuccess } from '../slices/authSlice';

export const BASE_URL = 'http://localhost:3001';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = axios.post(`${BASE_URL}/auth/login`, user);
        dispatch(loginSuccess());
        navigate('/');
    } catch (err) {

    }
}