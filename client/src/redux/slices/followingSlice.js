import { createSlice } from '@reduxjs/toolkit';

const followingSlice = createSlice({
    name: 'following',
    initialState: {
        newFeed: {
            data: [],
            isFetching: false,
            error: false,
        },
        likedList: {
            data: [],
            isFetching: false,
            error: false,
        },
        savedList: {
            data: [],
            isFetching: false,
            error: false,
        },
        historyList: {
            data: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // Action for fetching newFeed
        getNewFeedStart: (state) => {
            state.newFeed.isFetching = true;
        },
        getNewFeedSuccess: (state, action) => {
            state.newFeed.isFetching = false;
            state.newFeed.data = action.payload.items;
            state.newFeed.error = false;
            console.log('Data newFeed Success!');
        },
        getNewFeedFailed: (state) => {
            state.newFeed.isFetching = false;
            state.newFeed.error = true;
            console.log('Data newFeed Failed!');
        },
        //Liked list
        getLikedListStart: (state) => {
            state.likedList.isFetching = true;
        },
        getLikedListSuccess: (state, action) => {
            state.likedList.isFetching = false;
            state.likedList.data = action.payload;
            state.likedList.error = false;
            console.log('Data likedList Success!');
        },
        getLikedListFailed: (state) => {
            state.likedList.isFetching = false;
            state.likedList.error = true;
            console.log('Data likedList Failed!');
        },

        //Saved list
        getSavedListStart: (state) => {
            state.savedList.isFetching = true;
        },
        getSavedListSuccess: (state, action) => {
            state.savedList.isFetching = false;
            state.savedList.data = action.payload;
            state.savedList.error = false;
            console.log('Data savedList Success!');
        },
        getSavedListFailed: (state) => {
            state.savedList.isFetching = false;
            state.savedList.error = true;
            console.log('Data savedList Failed!');
        },

        //Recommend
        getHistoryListStart: (state) => {
            state.historyList.isFetching = true;
        },
        getHistoryListSuccess: (state, action) => {
            state.historyList.isFetching = false;
            state.historyList.data = action.payload;
            state.historyList.error = false;
            console.log('Data historyList Success!');
        },
        getHistoryListFailed: (state) => {
            state.historyList.isFetching = false;
            state.historyList.error = true;
            console.log('Data historyList Failed!');
        },
    },

});
export const {
    getNewFeedSuccess,
    getNewFeedStart,
    getNewFeedFailed,
    getLikedListStart,
    getLikedListSuccess,
    getLikedListFailed,
    getSavedListStart,
    getSavedListSuccess,
    getSavedListFailed,
    getHistoryListStart,
    getHistoryListSuccess,
    getHistoryListFailed,
} = followingSlice.actions;

export default followingSlice.reducer;
