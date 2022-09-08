import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    artistListInfo: [],
    artistCardInfo: null,
};

export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtistListInfo: (state, action) => {
            state.artistListInfo = action.payload;
        },
        setArtistCardInfo: (state, action) => {
            state.artistCardInfo = action.payload;
        },
    },
});
