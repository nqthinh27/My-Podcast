import { createSlice } from '@reduxjs/toolkit';

const followingSlice = createSlice({
    name: 'following',
    initialState: {
        newFeed: {
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
    },

});
export const {
    getNewFeedSuccess,
    getNewFeedStart,
    getNewFeedFailed,
} = followingSlice.actions;

export default followingSlice.reducer;
