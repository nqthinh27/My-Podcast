import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
    name: 'library',
    initialState: {
        recommend: {
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
        //Recommend
        getRecommendStart: (state) => {
            state.recommend.isFetching = true;
        },
        getRecommendSuccess: (state, action) => {
            state.recommend.isFetching = false;
            state.recommend.data = action.payload;
            state.recommend.error = false;
            console.log('Data recommend Success!');
        },
        getRecommendFailed: (state) => {
            state.recommend.isFetching = false;
            state.recommend.error = true;
            console.log('Data recommend Failed!');
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
    }
});
export const {
    getRecommendStart,
    getRecommendSuccess,
    getRecommendFailed,
    getLikedListStart,
    getLikedListSuccess,
    getLikedListFailed,
    getSavedListStart,
    getSavedListSuccess,
    getSavedListFailed,
    getHistoryListStart,
    getHistoryListSuccess,
    getHistoryListFailed,
} = librarySlice.actions;

export default librarySlice.reducer;
