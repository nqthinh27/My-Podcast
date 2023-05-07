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
        topPosts: {
            data: [],
            isFetching: false,
            error: false,
        },
        allPosts: {
            data: [],
            isFetching: false,
            error: false,
        },
        following: {
            data: [],
            isFetching: false,
            error: false,
        },
        followers: {
            data: [],
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
        setUserAccessToken: (state, action) => {
            state.login.access_token = action.payload;
        },

        // UPdate user
        updateUser: (state, action) => {
            const user = state.login.currentUser
            state.login.currentUser = { ...user, ...action.payload };
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


        // get all post
        getAllPostsStart: (state) => {
            state.allPosts.isFetching = true;
            console.log('Start Get Other all post!');
        },
        getAllPostsSuccess: (state, action) => {
            state.allPosts.isFetching = false;
            state.allPosts.data = action.payload;
            state.allPosts.error = false;
            console.log('Get Other all post Success!');
        },
        getAllPostsFailed: (state) => {
            state.allPosts.isFetching = false;
            state.allPosts.error = true;
            console.log('Get Other all post Failed!');
        },
        // get top post
        getTopPostsStart: (state) => {
            state.topPosts.isFetching = true;
            console.log('Start Get top post profile!');
        },
        getTopPostsSuccess: (state, action) => {
            state.topPosts.isFetching = false;
            state.topPosts.data = action.payload;
            state.topPosts.error = false;
            console.log('Get top post profile Success!');
        },
        getTopPostsFailed: (state) => {
            state.topPosts.isFetching = false;
            state.topPosts.error = true;
            console.log('Get top post profile Failed!');
        },
        // get followers
        getFollowersStart: (state) => {
            state.followers.isFetching = true;
            console.log('Start Get followers!');
        },
        getFollowersSuccess: (state, action) => {
            state.followers.isFetching = false;
            state.followers.data = action.payload;
            state.followers.error = false;
            console.log('Get followers Success!');
        },
        getFollowersFailed: (state) => {
            state.followers.isFetching = false;
            state.followers.error = true;
            console.log('Get followers Failed!');
        },
        // get following
        getFollowingStart: (state) => {
            state.following.isFetching = true;
            console.log('Start Get following!');
        },
        getFollowingSuccess: (state, action) => {
            state.following.isFetching = false;
            state.following.data = action.payload;
            state.following.error = false;
            console.log('Get following Success!');
        },
        getFollowingFailed: (state) => {
            state.following.isFetching = false;
            state.following.error = true;
            console.log('Get following Failed!');
        },
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
    setUserAccessToken,
    getAllPostsStart,
    getAllPostsSuccess,
    getAllPostsFailed,
    getTopPostsStart,
    getTopPostsSuccess,
    getTopPostsFailed,
    getFollowersStart,
    getFollowersSuccess,
    getFollowersFailed,
    getFollowingStart,
    getFollowingSuccess,
    getFollowingFailed,
    updateUser,
} = authSlice.actions;

export default authSlice.reducer;