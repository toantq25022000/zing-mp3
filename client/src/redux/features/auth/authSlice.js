import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '~/utils/fetchLocalStorage';

const initialState = {
    user: null,
    token: getToken(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});
