import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sliders: null,
    listBackgroundLyric: [],
    twoBackgroundForUILyric: [],
    arrayIndexListBGRandomLyric: [],
};

export const collectSlice = createSlice({
    name: 'collect',
    initialState,
    reducers: {
        setSliders: (state, action) => {
            state.sliders = action.payload;
        },
        setListBackgroundLyric: (state, action) => {
            state.listBackgroundLyric = action.payload;
        },

        setTwoBackgroundForUILyric: (state, action) => {
            state.twoBackgroundForUILyric = action.payload;
        },
        setArrayIndexListBGRandomLyric: (state, action) => {
            state.arrayIndexListBGRandomLyric = action.payload;
        },
    },
});
