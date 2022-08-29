import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: null,
};

export const userConfigSlice = createSlice({
    name: 'userConfig',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.token = action.payload;
        },
    },
});
