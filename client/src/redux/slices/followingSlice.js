import { createSlice } from '@reduxjs/toolkit';

const followingSlice = createSlice({
    name: 'following',
    initialState: {
        newFeed: {
            data: [],
            isFetching: false,
            error: false,
        },
        soundFollower: null,
        soundCurrent: 0,
        playStatus: {},
        playbackState: {},
        stopPlayback: false,
        duration: 0,
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
        setSoundFollower(state, action) {
            state.soundFollower = action.payload;
        },
        setSoundCurrent(state, action) {
            state.soundCurrent = action.payload;
        },
        setPlayStatus(state, action) {
            state.playStatus = action.payload;
        },
        setStopPlayback(state, action) {
            state.stopPlayback = action.payload;
        },
        setDuration(state, action) {
            state.duration = action.payload;
        },
        setPlaybackState(state, action) {
            const { id, position, duration } = action.payload;
            state.playbackState[id] = { position, duration };
        }
    },

});
export const {
    getNewFeedSuccess,
    getNewFeedStart,
    getNewFeedFailed,
    setSoundFollower,
    setSoundCurrent,
    setPlayStatus,
    setStopPlayback,
    setDuration,
    setPlaybackState
} = followingSlice.actions;

export default followingSlice.reducer;
