import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Async thunk for login action
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('/login', credentials);
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('user_name', credentials.user_name);
        localStorage.setItem('user_type', response.data.user_type);
        localStorage.setItem('id', response.data.id);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

// Auth slice definition
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_type');
            localStorage.removeItem('id');
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error on pending
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.error = null; // Reset error on success
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message; // Set specific error message
            });
    },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
