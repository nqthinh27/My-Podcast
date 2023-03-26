import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer
    }
});