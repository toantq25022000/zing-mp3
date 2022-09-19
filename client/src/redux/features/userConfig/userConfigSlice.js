import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: JSON.parse(localStorage.getItem('zm3_user_setting')) || { theme: null },
    config: null,
    isOpenSearchResult: false,
    isOpenPlayerQueue: false,
    sizeTextLyric: 'S',
};

export const userConfigSlice = createSlice({
    name: 'userConfig',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem('zm3_user_setting', JSON.stringify(action.payload));
        },
        setConfigTheme: (state, action) => {
            state.config = action.payload;
        },
        setIsOpenSearchResult: (state, action) => {
            state.isOpenSearchResult = action.payload;
        },
        setIsOpenPlayerQueue: (state, action) => {
            state.isOpenPlayerQueue = action.payload;
        },
        setSizeTextLyric: (state, action) => {
            state.sizeTextLyric = action.payload;
        },
    },
});
