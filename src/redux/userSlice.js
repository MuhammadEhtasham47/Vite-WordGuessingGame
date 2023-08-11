import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    words: [],
    shouldSettingsOpen: false,
    shouldHelpOpen: false,
    shouldStatsOpen: false,
    animation: true,
    gamesPlayed: 0,
    gamesWon: 0,
    winPercentage: 0,
    bestTry: 0,
    maxStreak: 0,
    currentStreak: 0,
    wordsGuessed: 0,
    showModal: false,
    correctWordsCount: {},
    incorrectGuessCount: {}
}

export const userSlice = createSlice({


    name: 'user',

    initialState,
    reducers: {
        openSettings: (state) => {
            state.shouldSettingsOpen = true
            state.shouldStatsOpen = false
            state.shouldHelpOpen = false

        },
        closeSettings: (state) => {
            state.shouldSettingsOpen = false
        },

        openHelp: (state) => {
            state.shouldHelpOpen = true
            state.shouldStatsOpen = false
            state.shouldSettingsOpen = false
        },
        closeHelp: (state) => {
            state.shouldHelpOpen = false
        },

        openStats: (state) => {
            state.shouldStatsOpen = true
            state.shouldHelpOpen = false
            state.shouldSettingsOpen = false
        },
        closeStats: (state) => {
            state.shouldStatsOpen = false
        },
        animateTrue: (state) => {
            state.animation = true
        },
        animateFalse: (state) => {
            state.animation = false
        },
        setWords: (state, action) => {
            state.words = action.payload.data.gameArray.wordArray;
        },
        setWordsArrayEmpty: (state, action) => {
            state.words = []
        },
        setCurrentStreak: (state, action) => {
            state.currentStreak = action.payload;
        },
        setBestTry: (state, action) => {
            state.bestTry = action.payload;
        },
        setMaxStreak: (state, action) => {
            state.maxStreak = action.payload;
        },
        setWinPercentage: (state, action) => {
            state.winPercentage = action.payload;
        },
        setGamesWon: (state, action) => {
            state.gamesWon = action.payload;
        },
        setGamesPlayed: (state, action) => {
            state.gamesPlayed = action.payload;
        },
        setWordsGuessed: (state, action) => {
            state.wordsGuessed = action.payload;
        },
        openShowModal: (state) => {
            state.showModal = true;
        },
        closeShowModal: (state) => {
            state.showModal = false;
        },
        setCorrectWordCount: (state, action) => {
            state.correctWordsCount = {
                ...state.correctWordsCount,
                [action.payload.joinedKeys]: action.payload.wordsGuessed
            }
        },
        setInCorrectGuessCount: (state, action) => {
            state.incorrectGuessCount = {
                ...state.incorrectGuessCount,
                [action.payload.joinedKeys]: action.payload.incorrectGuess
            }
        },
        setResetCount: (state, action) => {
            state.correctWordsCount = {}
            state.incorrectGuessCount = {}
        }
    },
})

export const { setResetCount, setInCorrectGuessCount, setCorrectWordCount, setWordsArrayEmpty, openShowModal, closeShowModal, setWordsGuessed, setBestTry, setCurrentStreak, setGamesPlayed, setGamesWon, setMaxStreak, setWinPercentage, openHelp, openSettings, openStats, closeHelp, closeSettings, closeStats, animateFalse, animateTrue, setWords } = userSlice.actions

export default userSlice.reducer