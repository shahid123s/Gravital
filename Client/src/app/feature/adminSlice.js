import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";



export const adminLogin = createAsyncThunk(
    'admin/login',
    async(credentials, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('admin/api/login', credentials);
            const {accessToken} = response.data;
            return accessToken;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)



const initialState = {
    isAdmin : false,
    accessToken: null, 
}

const adminSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(adminLogin.pending, (state) => {
            state.accessToken = null;
            state.isAdmin = false;
        })
        .addCase(adminLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload;
            state.isAdmin = true;
        })
        .addCase(adminLogin.rejected, (state, action) => {
            state.accessToken = null;
            state.isAdmin = false;
        })

    }
})


export default adminSlice.reducer;