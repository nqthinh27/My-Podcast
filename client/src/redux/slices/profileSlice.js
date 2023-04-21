import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        otherUser: {
            data: null,
            isFetching: false,
            error: false,
        },
        allPosts: {
            data: null,
            isFetching: false,
            error: false,
        },
        topPosts: {
            data: null,
            isFetching: false,
            error: false,
        },
        followers: {
            data: [],
            isFetching: false,
            error: false,
        },
        following: {
            data: [],
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        getOtherUserStart: (state) => {
            state.otherUser.isFetching = true;
            console.log('Start Get Other profile!');
        },
        getOtherUserSuccess: (state, action) => {
            state.otherUser.isFetching = false;
            state.otherUser.data = action.payload;
            state.otherUser.error = false;
            console.log('Get Other profile Success!');
        },
        getOtherUserFailed: (state) => {
            state.otherUser.isFetching = false;
            state.otherUser.error = true;
            console.log('Get Other profile Failed!');
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
    },
});

export const {
    getOtherUserStart,
    getOtherUserSuccess,
    getOtherUserFailed,
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
} = profileSlice.actions;
export default profileSlice.reducer;