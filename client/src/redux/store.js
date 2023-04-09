import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import loginReducer from './slices/loginSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        loginSuccess: loginReducer,
    }
});