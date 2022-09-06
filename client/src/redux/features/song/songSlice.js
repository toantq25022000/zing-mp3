import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    songId: JSON.parse(localStorage.getItem('zmp3-songId')) || '',
    songInfo: {
        title: '',
        artists: [],
        duration: 0,
    },
    srcAudio: '',
    isPlay: false,
    isLoop: JSON.parse(localStorage.getItem('zmp3-volume-isLoop')) || false,
    isRandom: JSON.parse(localStorage.getItem('zmp3-volume-isRandom')) || false,
    isVolumeOff: JSON.parse(localStorage.getItem('zmp3-volume-isOff')) || false,
    volume:
        JSON.parse(localStorage.getItem('zmp3-volume')) === 0
            ? 0
            : JSON.parse(localStorage.getItem('zmp3-volume')) || 100,
    arrayIndexRandom: [],
    currentIndexSong: 0,
};

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setSongId: (state, action) => {
            state.songId = action.payload;
            localStorage.setItem('zmp3-songId', JSON.stringify(action.payload));
        },
        setSongInfo: (state, action) => {
            state.songInfo = action.payload;
        },
        setSrcAudio: (state, action) => {
            state.srcAudio = action.payload;
        },
        setIsPlay: (state, action) => {
            state.isPlay = action.payload;
        },
        setIsLoop: (state, action) => {
            localStorage.setItem('zmp3-volume-isLoop', action.payload);
            state.isLoop = action.payload;
        },
        setIsRandom: (state, action) => {
            localStorage.setItem('zmp3-volume-isRandom', action.payload);
            state.isRandom = action.payload;
        },
        setIsVolumeOff: (state, action) => {
            state.isVolumeOff = action.payload;
            localStorage.setItem('zmp3-volume-isOff', action.payload);
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            localStorage.setItem('zmp3-volume', action.payload);
        },
        setArrayIndexRandom: (state, action) => {
            state.arrayIndexRandom = action.payload;
        },
        setCurrentIndexSong: (state, action) => {
            state.currentIndexSong = action.payload;
        },
    },
});
