import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        users: {
            data: [],
            isFetching: false,
            error: false,
        },
        posts: {
            data: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // search user
        searchUsersStart: (state) => {
            state.users.isFetching = true;
            console.log('Start search user!');
        },
        searchUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.data = [...action.payload];
            state.users.error = false;
            console.log('search user Success!');
        },
        searchUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.users.data = [];
            console.log('search user Failed!');
        },
        // search post
        searchPostsStart: (state) => {
            state.posts.isFetching = true;
            console.log('Start search post!');
        },
        searchPostsSuccess: (state, action) => {
            state.posts.isFetching = false;
            state.posts.data = [...action.payload];
            state.posts.error = false;
            console.log('search post Success!');
        },
        searchPostsFailed: (state) => {
            state.posts.isFetching = false;
            state.posts.error = true;
            state.posts.data = [];
            console.log('search post Failed!');
        },
    },
});

export const {
    searchUsersStart,
    searchUsersSuccess,
    searchUsersFailed,
    searchPostsStart,
    searchPostsSuccess,
    searchPostsFailed
} = searchSlice.actions;
export default searchSlice.reducer;