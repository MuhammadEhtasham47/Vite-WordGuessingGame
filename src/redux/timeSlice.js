import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstInput: null, // for storing the JWT
    endTime: null, // for storing the
}

const timeSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        firstTimeInput: (state) => {
            state.firstInput = new Date();
        },
        gameEndTime: (state) => {
            state.endTime = new Date();
        },
        resetTime: (state) => {
            state.firstInput = null;
            state.endTime = null;
        }
    }
})
export const { firstTimeInput, resetTime, gameEndTime } = timeSlice.actions;

export default timeSlice.reducer