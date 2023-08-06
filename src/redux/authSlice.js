import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userToken: null, // for storing the JWT
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.userToken = action.payload.data.result.access_token;
        },
        logoutSuccess: (state) => {
            state.userToken = null;
        }
    }
})
export const { logoutSuccess, loginSuccess } = authSlice.actions;

export default authSlice.reducer
export const userToken = initialState.userToken;