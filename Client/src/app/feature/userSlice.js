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

export const refreshAccessToken = createAsyncThunk(
    'user/refreshAccessToken',
    async(_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/user/api/refresh-token');
            const {accessToken} = response.data;
            return accessToken;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message )
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
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading  = false;
            state.accessToken = action.payload;
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
        .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // refreshAccessToken
        .addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload;
            state.error = null;
            state.loading  = false;
        })
        .addCase(refreshAccessToken.rejected, (state) => {
            state.accessToken =  null;
        })
    }

})




export default userSlice.reducer