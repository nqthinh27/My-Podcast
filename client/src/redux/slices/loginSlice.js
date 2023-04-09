import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoginSuccess: false,
    },
    reducers: {
        loginAccount: state => {
            state.isLoginSuccess = !state.isLoginSuccess;
        },
    },
});

export const { loginAccount } = loginSlice.actions;
export default loginSlice.reducer;