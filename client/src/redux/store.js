import { configureStore } from '@reduxjs/toolkit';
import { artistSlice } from './features/artist/artistSlice';
import { authSlice } from './features/auth/authSlice';
import { collectSlice } from './features/collect/collectSlice';
import { playlistSlice } from './features/playlist/playlistSlice';
import { songSlice } from './features/song/songSlice';
import { userConfigSlice } from './features/userConfig/userConfigSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        song: songSlice.reducer,
        artist: artistSlice.reducer,
        collect: collectSlice.reducer,
        playlist: playlistSlice.reducer,
        userConfig: userConfigSlice.reducer,
    },
});
