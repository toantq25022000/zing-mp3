import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './features/auth/authSlice';
import { userConfigSlice } from './features/userConfig/userConfigSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userConfig: userConfigSlice.reducer,
    },
});
