import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import loginReducer from './slices/loginSlice';
import playerReducer from './slices/playerSlice';
import homeReducer from './slices/homeSlice';
import followingReducer from './slices/followingSlice';
import libraryReducer from './slices/librarySlice';
import profileReducer from './slices/profileSlice';
import postReducer from './slices/postSlice';
import searchReducer from './slices/searchSlice';
import languageReducer from './slices/languageSlice';
import commentReducer from './slices/commentSlice';

const middleware = getDefaultMiddleware({
    serializableCheck: false,
});

export default configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        loginSuccess: loginReducer,
        player: playerReducer,
        home: homeReducer,
        profile: profileReducer,
        post: postReducer,
        following: followingReducer,
        library: libraryReducer,
        profile: profileReducer,
        search: searchReducer,
        language: languageReducer,
        comment: commentReducer,
    },
    middleware,
    player: {
        middleware: [
            ...middleware,
        ],
        serializableCheck: false,
    },
});