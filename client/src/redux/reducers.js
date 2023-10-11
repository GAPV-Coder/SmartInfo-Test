/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:5000/api/v1';

// Register user slice
const registerUserSlice = createSlice({
    name: 'registerUser',
    initialState: { isLoading: false, isSuccess: false, isError: false, errorMessage: '' },
    reducers: {
        registerUserRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
        },
        registerUserSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
        },
        registerUserFailure: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = action.payload;
        },
    },
});

// Login user slice
const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: { isLoading: false, isSuccess: false, isError: false, errorMessage: '' },
    reducers: {
        loginUserRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = '';
        },
        loginUserSuccess: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
        },
        loginUserFailure: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = action.payload;
        },
    },
});

// Get all users slice
const getAllUsersSlice = createSlice({
    name: 'getAllUsers',
    initialState: { isLoading: false, isSuccess: false, isError: false, errorMessage: '', users: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(getAllUsers.pending, getAllUsers.fulfilled, getAllUsers.rejected),
                (state, action) => {
                    state.isLoading = action.meta.requestStatus === 'pending';
                    state.isSuccess = action.meta.requestStatus === 'fulfilled';
                    state.isError = action.meta.requestStatus === 'rejected';
                    state.errorMessage = action.payload?.message ?? '';
                }
            )
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    },
});

// RTK Query API
const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: '/auth/create',
                method: 'POST',
                body: user,
            }),
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: user,
            }),
        }),
        getAllUsers: builder.query({
            query: () => '/users',
        }),
    }),
});

// Export reducers and actions
export const { registerUserRequest, registerUserSuccess, registerUserFailure } = registerUserSlice.actions;
export const { loginUserRequest, loginUserSuccess, loginUserFailure } = loginUserSlice.actions;
export const { getAllUsers } = api.endpoints;
export default api.reducer;