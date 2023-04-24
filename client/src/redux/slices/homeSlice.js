import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        slider: {
            data: [],
            isFetching: false,
            error: false,
        },
        topTrending: {
            data: [],
            isFetching: false,
            error: false,
        },
        newReLease: {
            data: [],
            isFetching: false,
            error: false,
        },
        topAuthor: {
            data: [],
            isFetching: false,
            error: false,
        },
        // dataTopTrending: [],
        // playListData: [],    // danh sách phát
        // recommendData: [],   // danh sách gợi ý
        // relexData: [],       // danh sách nhạc thư giãn
        // newReLeaseData: [],  // danh sách nhạc mới phát hành
        // isFetching: false,
    },
    reducers: {
        // Action for fetching slider
        getSliderStart: (state) => {
            state.slider.isFetching = true;
        },
        getSliderSuccess: (state, action) => {
            state.slider.isFetching = false;
            state.slider.data = action.payload.items;
            state.slider.error = false;
            console.log('Data Slider Success!');
        },
        getSliderFailed: (state) => {
            state.slider.isFetching = false;
            state.slider.error = true;
            console.log('Data Slider Failed!');
        },

        // Action for fetching top trending data
        getTopTrendingStart: (state) => {
            state.topTrending.isFetching = true;
        },
        getTopTrendingSuccess: (state, action) => {
            state.topTrending.isFetching = false;
            state.topTrending.data = action.payload.items;
            state.topTrending.error = false;
            console.log('Data TopTrending Success!');
        },
        getTopTrendingFailed: (state) => {
            state.topTrending.isFetching = false;
            state.topTrending.error = true;
            console.log('Data TopTrending Failed!');
        },
        // Action for fetching new release data
        getNewReleaseStart: (state) => {
            state.newReLease.isFetching = true;
        },
        getNewReleaseSuccess: (state, action) => {
            state.newReLease.isFetching = false;
            state.newReLease.data = action.payload.items;
            state.newReLease.error = false;
            console.log('Data Release Success!');
        },
        getNewReleaseFailed: (state) => {
            state.newReLease.isFetching = false;
            state.newReLease.error = true;
            console.log('Data Release Failed!');
        },

        // Action for fetching top author data
        getTopAuthorStart: (state) => {
            state.topAuthor.isFetching = true;
        },
        getTopAuthorSuccess: (state, action) => {
            state.topAuthor.isFetching = false;
            state.topAuthor.data = action.payload.items;
            state.topAuthor.error = false;
            console.log('Data TopAuthor Success!');
        },
        getTopAuthorFailed: (state) => {
            state.topAuthor.isFetching = false;
            state.topAuthor.error = true;
            console.log('Data TopAuthor Failed!');
        },
    },

});
export const {
    getSliderSuccess,
    getSliderStart,
    getSliderFailed,
    getTopTrendingStart,
    getTopTrendingSuccess,
    getTopTrendingFailed,
    getNewReleaseStart,
    getNewReleaseSuccess,
    getNewReleaseFailed,
    getTopAuthorStart,
    getTopAuthorSuccess,
    getTopAuthorFailed,

} = homeSlice.actions;

export default homeSlice.reducer;
