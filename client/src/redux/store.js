import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import loginReducer from './slices/loginSlice';
import playerReducer from './slices/playerSlice';
import homeReducer from './slices/homeSlice';
import libraryReducer from './slices/librarySlice';
import profileReducer from './slices/profileSlice';
import searchReducer from './slices/searchSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        loginSuccess: loginReducer,
        player: playerReducer,
        home: homeReducer,
        library: libraryReducer,
        profile: profileReducer,
        search: searchReducer
    }
});