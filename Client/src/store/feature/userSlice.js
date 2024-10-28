import {createSlic, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/axios';

export const login = createAsyncThunk(
    'user/login',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('user/api/login', credentials);
            const {accessToken} = response.data;
            return accessToken;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login Failed');
        }
    }
)

const initialState = {
    accessToken : null || localStorage.getItem('accesstoken'),
    isAuthenticate : false,
    loading : false,
    error : null,
}

const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers : {
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticate = false;
        },
    },
    extraReducers : (builder) => {
        builder
        .addCase
    }

})