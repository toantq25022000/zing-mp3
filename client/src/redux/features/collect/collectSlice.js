import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sliders: null,
};

export const collectSlice = createSlice({
    name: 'collect',
    initialState,
    reducers: {
        setSliders: (state, action) => {
            state.sliders = action.payload;
        },
    },
});
