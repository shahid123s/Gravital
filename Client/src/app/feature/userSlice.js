import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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

export const logout = createAsyncThunk(
    'user/logout',
    async (_, {rejectWithValue}) => {
        const response = await axiosInstance.post('user/api/logout');
        return response.data
    }
)

const initialState = {
    accessToken : null ,
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
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading  = false;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticate = true
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //logout
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logout.fulfilled, (state, actiion) => {
            state.isAuthenticate = false;
            state.accessToken = null;
        })
    }

})



export default userSlice.reducer;