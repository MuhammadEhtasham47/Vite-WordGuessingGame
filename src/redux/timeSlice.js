import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstInput: null, // for storing the JWT
    endTime: null, // for storing the
    wordGuessesForReload: [...Array(6)],
    incorrectGuessesForReload: 0,
    turnForReload: 0,
    isPlayed: false,
    lastPlayed: null,
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
        },
        setGuessesForReload: (state, action) => {
            state.wordGuessesForReload = action.payload
        },

        setIncorrectGuessesForReload: (state, action) => {
            state.incorrectGuessesForReload = action.payload
        },
        setTurnForReload: (state, action) => {
            state.turnForReload = action.payload
        },

        resetGuesses: (state) => {
            state.wordGuessesForReload = [...Array(6)]
            state.incorrectGuessesForReload = 0
            state.turnForReload = 0
        },
        setLastPlayed: (state, action) => {
            state.lastPlayed = action.payload
        },
        setIsPlayed: (state, action) => {
            state.isPlayed = action.payload
        }
    }
})
export const { setIsPlayed, setLastPlayed, firstTimeInput, resetTime, gameEndTime, setGuessesForReload, resetGuesses, setIncorrectGuessesForReload, setTurnForReload } = timeSlice.actions;

export default timeSlice.reducer