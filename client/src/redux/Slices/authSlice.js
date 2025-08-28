import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/axios'

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/register`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, userData);
      localStorage.setItem("token", response.data.token); // store token
      localStorage.setItem("user_id", response.data.user.id)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        token:localStorage.getItem("token") || null,
        user_id:localStorage.getItem("user_id") || null,
        loading: false,
        error: null,
        // success:false
    },
    reducers:{
        logout:(state)=>{
            state.user = null,
            state.token = null,
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(signupUser.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(signupUser.fulfilled, (state,action)=>{
            state.loading = false,
            state.user = action.payload.user
        })
        .addCase(signupUser.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
        .addCase(loginUser.pending, (state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.loading = false,
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.user_id = action.payload.user_id
            // state.success = true
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.payload
        })
    }
})

export const {logout} = authSlice.actions

export default authSlice.reducer