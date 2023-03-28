import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            access_token: null,
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
        setUserAccessToken: (state, action) => {
            state.login.access_token = action.payload;
        },

        // LOGOUT
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.login.access_token = null;
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
    logoutFailed,
    setUserAccessToken
} = authSlice.actions;

export default authSlice.reducer;