import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        otherUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        getOtherUserStart: (state) => {
            state.isFetching = true;
            console.log('Start Get Other profile!');
        },
        getOtherUserSuccess: (state, action) => {
            state.isFetching = false;
            state.otherUser = action.payload;
            state.error = false;
            console.log('Get Other profile Success!');
        },
        getOtherUserFailed: (state) => {
            state.isFetching = false;
            state.error = true;
            console.log('Get Other profile Failed!');
        },
    },
});

export const {
    getOtherUserStart,
    getOtherUserSuccess,
    getOtherUserFailed
} = profileSlice.actions;
export default profileSlice.reducer;