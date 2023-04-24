import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        detailPost: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        getPostDataStart: (state) => {
            state.isFetching = true;
            console.log('Start Post Data!');
        },
        getPostDataSuccess: (state, action) => {
            state.isFetching = false;
            state.detailPost = action.payload;
            state.error = false;
            console.log('Post Data Success!');
        },
        getPostDataFailed: (state) => {
            state.isFetching = false;
            state.error = true;
            console.log('Post Data Failed!');
        },
        setDetailPost: (state, action) => {
            state.detailPost = action.payload;
        },
    },
});

export const {
    getPostDataStart,
    getPostDataSuccess,
    getPostDataFailed,
    setDetailPost
} = postSlice.actions;
export default postSlice.reducer;