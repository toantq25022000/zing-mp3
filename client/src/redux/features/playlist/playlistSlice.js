import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playlists: JSON.parse(localStorage.getItem('zmp3-playlistSong')) || null,
    playlistId: localStorage.getItem('zmp3-playlistId') || null,
    playlistInfo: JSON.parse(localStorage.getItem('zmp3-playlist-info')) || null,
    playlistsRandom: null,
};

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylistId: (state, action) => {
            state.playlistId = action.payload;
            localStorage.setItem('zmp3-playlistId', action.payload);
        },
        setPlaylistInfo: (state, action) => {
            state.playlistInfo = action.payload;
            localStorage.setItem('zmp3-playlist-info', JSON.stringify(action.payload));
        },
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
            localStorage.setItem('zmp3-playlistSong', JSON.stringify(action.payload));
        },
        setPlaylistsRandom: (state, action) => {
            state.playlistsRandom = action.payload;
        },
    },
});
