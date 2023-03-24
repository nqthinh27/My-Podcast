import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // LOGIN
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            console.log('Login Success!');
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
            console.log('Login Failed!');
        },

        // LOGOUT
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
            console.log('Logout Success!');
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
            console.log('Logout Failed!');
        },
        // logoutSuccess: (state, action) => {
        //     state.logout.isFetching = false;
        //     state.login.currentUser = action.payload;
        //     state.logout.error = false;
        //     console.log('Logout Success!');
        // },
        // logoutFailed: (state) => {
        //     state.logout.isFetching = true;
        //     state.logout.error = true;
        //     console.log('Logout Failed!');
        // },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout,
    logoutStart,
    logoutSuccess,
    logoutFailed
} = authSlice.actions;

export default authSlice.reducer;