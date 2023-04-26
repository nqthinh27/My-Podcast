import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
    name: 'library',
    initialState: {
        recommend: {
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
    }
});
export const {
    getRecommendStart,
    getRecommendSuccess,
    getRecommendFailed,
} = librarySlice.actions;

export default librarySlice.reducer;
