import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comment: {
            commentText: '',
            isFetching: false,
            error: false,
        },
        commentData: {
            data: [],
            isFetching: false,
            error: false,
        },
        isCommentPosted: false,
        isComment: false,
        commentCurrent: 0,
    },
    reducers: {
        getCommentStart: (state) => {
            state.comment.isFetching = true;
        },
        getCommentSuccess: (state, action) => {
            state.comment.isFetching = false;
            state.comment.commentText = action.payload;
            state.comment.error = false;
            console.log('Bình luận thành công!');
        },
        getCommentFailed: (state) => {
            state.comment.isFetching = false;
            state.comment.error = true;
            console.log('Bình luận thất bại!');
        },
        setCommentText: (state, action) => {
            state.comment.commentText = action.payload;
        },
        getCommentDataStart: (state) => {
            state.commentData.isFetching = true;
        },
        getCommentDataSuccess: (state, action) => {
            state.commentData.isFetching = false;
            state.commentData.data = action.payload;
            state.commentData.error = false;
            console.log('Lấy tất cả bình luận thành công!');
        },
        getCommentDataFailed: (state) => {
            state.commentData.isFetching = false;
            state.commentData.error = true;
            console.log('Lấy bình luận thất bại!');
        },
        setIsCommentPosted: (state, action) => {
            state.isCommentPosted = action.payload;
        },
        setIsComment: (state, action) => {
            state.isComment = action.payload;
        },
        setCommentCurrent: (state, action) => {
            state.commentCurrent = action.payload;
        },
    },
});

export const {
    getCommentStart,
    getCommentSuccess,
    getCommentFailed,
    setCommentText,
    getCommentDataStart,
    getCommentDataSuccess,
    getCommentDataFailed,
    setIsCommentPosted,
    setIsComment,
    setCommentCurrent
} = commentSlice.actions;
export default commentSlice.reducer;