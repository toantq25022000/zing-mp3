import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: JSON.parse(localStorage.getItem('zm3_user_setting')) || null,
};

export const userConfigSlice = createSlice({
    name: 'userConfig',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('zm3_user_setting', JSON.stringify(action.payload));
        },
    },
});
